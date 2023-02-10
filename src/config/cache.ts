import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  config: {
    redis: RedisOptions
  }
  driver: string
}

const cache: ICacheConfig = {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT as unknown as number,
      password: process.env.REDIS_PASS || undefined
    }
  },
  driver: process.env.CACHE_DRIVER as string
}

export default cache
