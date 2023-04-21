import Redis, { Redis as RedisClient } from 'ioredis'
import cacheConfig from '@config/cache'
import { ICacheProvider } from '@shared/data/cache_provider_interface'

class RedisCache implements ICacheProvider {
  public client: RedisClient;
  private connected: boolean = false

  public async connect (): Promise<void> {
    if (this.connected) {
      return
    }

    this.client = new Redis(cacheConfig.config.redis)
    await this.client.connect()
    this.connected = true
  }

  public async save (key: string, value: any): Promise<void> {
    if (!this.connected) {
      await this.connect()
    }

    await this.client.set(key, JSON.stringify(value))
  }

  public async recover<T> (key: string): Promise<T | null> {
    if (!this.connected) {
      await this.connect()
    }
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

export default RedisCache
