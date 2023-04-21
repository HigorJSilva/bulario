import env from '@config/env'
import { DataSource } from 'typeorm'

const migrationPaths: string[] = env.enviroment !== 'production' ? ['./migrations/{.ts,.js}'] : []

const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.mysqlHost,
  port: env.mysqlPort as number,
  username: env.mysqlUser,
  password: env.mysqlPassword,
  database: env.mysqlDatabase,
  migrations: migrationPaths,
  entities: ['**/db/models/*.js']
})

export default AppDataSource
