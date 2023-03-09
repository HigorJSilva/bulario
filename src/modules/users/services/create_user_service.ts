import { IHashProvider } from '@shared/data/hash_provider_interface'
import { emailNotUnique } from '@shared/messages/en'
import { IUsersRepository } from '../data/users_repository_interface'
import { ICreateUser } from '../domain/create_user_interface'
import { IUser } from '../domain/user_interface'

class CreateUserService {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider
  ) {}

  public async run ({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      const error = Error(emailNotUnique)
      error.name = 'ValidationError'
      throw error
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserService
