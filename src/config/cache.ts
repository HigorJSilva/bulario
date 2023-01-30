import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  config: {
    redis: RedisOptions
  }
  driver: string
}

const redisConfig: ICacheConfig = {
  config: {
    redis: {
      host: 'redis',
      port: process.env.REDIS_PORT as unknown as number,
      password: process.env.REDIS_PASS || undefined
    }
  },
  driver: 'redis'
}

export default redisConfig
