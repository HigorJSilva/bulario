export default {
  cacheDriver: process.env.CACHE_DRIVER ?? 'redis',
  redisHost: process.env.REDIS_HOST ?? 'redis',
  redisPort: process.env.REDIS_PORT ?? '6379',
  redisPass: process.env.redisPass ?? null,

  databaseDriver: process.env.DATABASE_DRIVER ?? 'mongodb',
  mongoUrlConnection: process.env.MONGO_URL_CONNECTION ?? 'mongodb://mongo:27017/bulario',

  mysqlHost: process.env.MYSQL_HOST ?? 'mysql',
  mysqlUser: process.env.MYSQL_USER ?? 'mysql',
  mysqlPort: process.env.MYSQL_PORT ?? 3306,
  mysqlPassword: process.env.MYSQL_PASSWORD ?? 'password',
  mysqlDatabase: process.env.MYSQL_DATABASE ?? 'bulario',

  appSecret: process.env.APP_SECRET ?? '389127R8232HDAS7dwasd7'

}
