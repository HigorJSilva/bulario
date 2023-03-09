import { IUsersRepository } from '@modules/users/data/users_repository_interface'
import { ICreateUser } from '@modules/users/domain/create_user_interface'
import { IUser } from '@modules/users/domain/user_interface'
import AppDataSource from '@shared/infra/db'
import { Repository } from 'typeorm'
import User from '../models/user_model'

class UsersRepository implements IUsersRepository {
  private readonly ormRepository: Repository<User>;

  constructor () {
    this.ormRepository = AppDataSource.getRepository(User)
  }

  public async create ({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.ormRepository.create({ name, email, password })

    await this.ormRepository.save(user)

    return user as IUser
  }

  public async save (user: User): Promise<User> {
    await this.ormRepository.save(user)

    return user
  }

  public async findByEmail (email: string): Promise<IUser | null> {
    const customer = await this.ormRepository.findOneBy({
      email
    })

    return customer
  }
}

export default UsersRepository
