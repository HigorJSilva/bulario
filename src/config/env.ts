export default {
  cacheDriver: process.env.CACHE_DRIVER ?? 'redis',
  redisHost: process.env.REDIS_HOST ?? 'redis',
  redisPort: process.env.REDIS_PORT ?? '6379',
  redisPass: process.env.REDIS_PASS ?? null,

  databaseDriver: process.env.DATABASE_DRIVER ?? 'mongodb',
  mongoUrlConnection: process.env.MONGO_URL_CONNECTION ?? 'mongodb://mongo:27017/bulario',

  mysqlHost: process.env.MYSQL_HOST ?? 'localhost',
  mysqlUser: process.env.MYSQL_USER ?? 'mysql',
  mysqlPort: process.env.MYSQL_PORT ?? 3326,
  mysqlPassword: process.env.MYSQL_PASSWORD ?? 'password',
  mysqlDatabase: process.env.MYSQL_DATABASE ?? 'bulario',

  appSecret: process.env.APP_SECRET ?? '389127R8232HDAS7dwasd7',
  enviroment: process.env.enviroment ?? 'dev',

  postgresHost: process.env.POSTGRES_HOST ?? 'postgres',
  postgresPort: process.env.POSTGRES_PORT ?? 5432,
  postgresUser: process.env.POSTGRES_USER ?? 'postgres',
  postgresPassword: process.env.POSTGRES_PASSWORD ?? 'password',
  postgresDatabase: process.env.POSTGRES_DATABASE ?? 'bulario'

}
