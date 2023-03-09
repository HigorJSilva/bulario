import 'reflect-metadata'
import CacheService from '@shared/infra/cache/cache_service'
import server from './shared/infra/http/app'
import '@shared/infra/db'

CacheService.getInstance()

export = server.listen(4000, () => {
  console.log('Server running')
});
