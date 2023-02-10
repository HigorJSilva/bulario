import DatabaseService from '@shared/infra/db/database_service'
import server from './shared/infra/http/app'
// eslint-disable-next-line no-new
DatabaseService.getInstance()

export = server.listen(4000, () => {
  console.log('Server running')
});
