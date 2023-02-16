import env from './env'

export interface IDBConfig {
  config: {
    mongodb: {url: string}
  }
  driver: string
}

const databaseConfig = {
  config: {
    mongodb: {
      url: env.mongoUrlConnection
    },
    mysql: {
      host: env.mysqlHost,
      user: env.mysqlUser,
      password: env.mysqlPassword,
      database: env.mysqlDatabase
    }
  },
  driver: env.databaseDriver
}

export default databaseConfig
