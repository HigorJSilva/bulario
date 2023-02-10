export interface IDBConfig {
  config: {
    mongodb: {url: string}
  }
  driver: string
}

const databaseConfig = {
  config: {
    mongodb: {
      url: process.env.MONGO_URL_CONNECTION
    },
    mysql: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    }
  },
  driver: process.env.DATABASE_DRIVER
}

export default databaseConfig
