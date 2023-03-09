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
  ],
  entities: ['**/db/models/*.ts']
})

export default AppDataSource
