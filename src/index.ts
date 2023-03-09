import 'reflect-metadata'
import server from './shared/infra/http/app'
import AppDataSource from '@shared/infra/db'

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source running!')

    server.listen(4000, () => {
      console.log('Server running')
    })
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
