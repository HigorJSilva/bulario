import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  type: 'mongodb',
  host: 'mongo',
  port: 27017,
  database: 'bulario',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  synchronize: false,
  migrations: [
    './migrations/*.ts'
  ]
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source running!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
