export default {
  cacheDriver: process.env.CACHE_DRIVER || 'redis',
  redisHost: process.env.REDIS_HOST || 'redis',
  redisPort: process.env.REDIS_PORT || '6379',
  redisPass: process.env.redisPass || null,

  databaseDriver: process.env.DATABASE_DRIVER || 'mongodb',
  mongoUrlConnection: process.env.MONGO_URL_CONNECTION || 'mongodb://mongo:27017/bulario',

  mysqlHost: process.env.MYSQL_HOST || '127,.0.0.1',
  mysqlUser: process.env.MYSQL_USER || 'user',
  mysqlPassword: process.env.MYSQL_PASSWORD || 'root',
  mysqlDatabase: process.env.MYSQL_DATABASE || 'bulario'

}
