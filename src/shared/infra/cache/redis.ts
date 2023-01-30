import Redis, { Redis as RedisClient } from 'ioredis'
import cacheConfig from '@config/cache'
import { ICacheProvider } from '@shared/data/cache_provider_interface'

class RedisCache implements ICacheProvider {
  private readonly client!: RedisClient;
  private readonly connected: boolean = false;

  constructor () {
    if (!this.connected) {
      this.client = new Redis(cacheConfig.config.redis)
      this.connected = true
    }
  }

  public async save (key: string, value: any): Promise<void> {
    console.log('TURBO >> file: redis.ts:16 >> RedisCache >> value', value)
    console.log('TURBO >> file: redis.ts:16 >> RedisCache >> key', key)
    await this.client.set(key, JSON.stringify(value))
  }

  public async recover<T> (key: string): Promise<T | null> {
    const data = await this.client.get(key)

    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data) as T

    return parsedData
  }

  public async invalidate (key: string): Promise<void> {
    await this.client.del(key)
  }
}

export default new RedisCache()