import { Collection, MongoClient } from 'mongodb'

class MongoDB {
  private static instance: MongoDB | null = null
  private client: any
  private readonly url: string

  private constructor (url: string) {
    this.url = url
    this.client = new MongoClient(url)
  }

  static getInstance (url: string): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB(url)
    }
    return MongoDB.instance
  }

  async connect (): Promise<void> {
    if (!this.client) {
      this.client = new MongoClient(this.url)
    }

    await this.client.connect()
    console.log('MongoDB running')
  }

  async disconnect (): Promise<void> {
    if (!this.client) {
      this.client = new MongoClient(this.url)
    }

    await this.client.close()
  }

  getDB (): any {
    return this
  }

  getCollection (name: string): Collection {
    if (!this.client) {
      this.client = new MongoClient(this.url)
    }

    return this.client.db().collection(name)
  }
}

export default MongoDB
