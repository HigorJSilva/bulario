import { IHashProvider } from '@shared/data/hash_provider_interface'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe'
import { userCredsMatch } from '@shared/messages/en'
import { IUsersRepository } from '../data/users_repository_interface'
import { ILoggedUser } from '../domain/logged_user_interface'
import { ILoginUser } from '../domain/login_user_interface'
import { IJwtProvider } from '@shared/data/jwt_provider_interface'

@injectable()
class LoginService {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @inject('JwtProvider')
    private readonly jwtProvider: IJwtProvider
  ) {}

  public async run (loginData: ILoginUser): Promise<ILoggedUser> {
    const userExists = await this.usersRepository.findByEmail(loginData.email)

    if (!userExists) {
      const error = Error(userCredsMatch)
      error.name = 'ValidationError'
      throw error
    }

    const matchPassword = await this.hashProvider.compareHash(loginData.password, userExists.password)

    if (!matchPassword) {
      const error = Error(userCredsMatch)
      error.name = 'ValidationError'
      throw error
    }

    const { password, ...protectedUser } = userExists

    return { user: protectedUser, token: this.jwtProvider.sign(protectedUser) }
  }
}

export default LoginService
