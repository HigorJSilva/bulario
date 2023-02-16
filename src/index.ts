import 'module-alias/register'
import CacheService from '@shared/infra/cache/cache_service'
import DatabaseService from '@shared/infra/db/database_service'
import server from './shared/infra/http/app'
// eslint-disable-next-line no-new
DatabaseService.getInstance()
CacheService.getInstance()

export = server.listen(4000, () => {
  console.log('Server running')
});
