import { IHashProvider } from '@shared/data/hash_provider_interface'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe'
import { emailNotUnique } from '@shared/messages/en'
import { IUsersRepository } from '../data/users_repository_interface'
import { ICreateUser } from '../domain/create_user_interface'
import { IUser } from '../domain/user_interface'
import { ValidationError } from '@shared/factories/makeValidationError'

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async run ({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new ValidationError(emailNotUnique)
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
