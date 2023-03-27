import env from '@config/env'
import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.mysqlHost,
  port: env.mysqlPort as number,
  username: env.mysqlUser,
  password: env.mysqlPassword,
  database: env.mysqlDatabase,
  migrations: [
    './migrations/*.ts'
  ],
  entities: ['**/db/models/*.ts']
})

export default AppDataSource
