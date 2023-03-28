import { v4 as uuidv4 } from 'uuid'
import { IUsersRepository } from '../data/users_repository_interface'
import { ICreateUser } from '../domain/create_user_interface'
import { IUser } from '../domain/user_interface'
import User from '../infra/db/models/user_model'

class FakeUsersRepository implements IUsersRepository {
  private readonly users: User[] = []

  public async create (data: ICreateUser): Promise<IUser> {
    const user = new User()

    user.id = uuidv4()
    user.name = data.name
    user.email = data.email
    user.password = data.password

    this.users.push(user)
    await Promise.resolve()
    return user
  }

  public async findByEmail (email: string): Promise<IUser | null> {
    await Promise.resolve()
    const user = this.users.find(user => user.email === email)
    return user as User
  }

  public async findById (id: string): Promise<IUser | null> {
    await Promise.resolve()
    const user = this.users.find(user => user.id === id)
    return user as User
  }
}

export default FakeUsersRepository
