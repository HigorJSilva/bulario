import cacheConfig from '@config/cache'
import RedisCache from './redis/redis'

class CacheService {
  private static instance: CacheService | null = null
  private readonly cache: any

  private constructor () {
    const type = cacheConfig.driver
    switch (type) {
      case 'redis':
        // eslint-disable-next-line no-case-declarations
        this.cache = RedisCache

        break
      case 'other':
        break
      default:
        throw new Error(`Invalid database type: ${type}`)
    }
  }

  static getInstance (): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService()
    }
    return CacheService.instance
  }

  getCache (): any {
    return this.cache
  }
}

export default CacheService
