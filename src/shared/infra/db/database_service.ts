import databaseConfig from '@config/database'
import MongoDB from './mongo/mongo_service'

class DatabaseService {
  private static instance: DatabaseService | null = null
  private db: any

  private constructor () {
    const type = databaseConfig.driver
    switch (type) {
      case 'mongodb':
        // eslint-disable-next-line no-case-declarations
        const mongoDB = MongoDB.getInstance(databaseConfig.config.mongodb.url as string)

        mongoDB.connect().then(() => {
          this.db = mongoDB.getDB()
        }).catch(() => {
          console.error('Cannot connect to MongoDB')
        })

        break
      case 'mysql':
        // const mysql = Mysql.getInstance(databaseConfig.config.mysql)
        // this.db = mysql.createConnection(options)
        break
      default:
        throw new Error(`Invalid database type: ${type}`)
    }
  }

  static getInstance (): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  getDB (): any {
    return this.db
  }
}

export default DatabaseService
