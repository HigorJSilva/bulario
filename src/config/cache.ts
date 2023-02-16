import { RedisOptions } from 'ioredis'
import env from './env'

interface ICacheConfig {
  config: {
    redis: RedisOptions
  }
  driver: string
}

const cache: ICacheConfig = {
  config: {
    redis: {
      host: env.redisHost,
      port: env.redisPort as unknown as number,
      password: env.redisPass || undefined
    }
  },
  driver: env.cacheDriver
}

export default cache
