import { ValidationError } from '@shared/exceptions'
import FakeHashProvider from '@shared/infra/hash/fake/fake_hash_provider'
import FakeJwtProvider from '@shared/infra/jwt/fake/fake_jwt_provider'
import FakeUsersRepository from '../repository/fake_users_repository'
import CreateUserService from './create_user_service'
import LoginService from './login_service'

const fakeUsersRepository = new FakeUsersRepository()
const fakeHashRepository = new FakeHashProvider()

const makeSut = (): LoginService => {
  const fakeJwtRepository = new FakeJwtProvider()

  const loginService = new LoginService(fakeUsersRepository, fakeHashRepository, fakeJwtRepository)
  return loginService
}

const makeCreateUserService = (): CreateUserService => {
  const createUserService = new CreateUserService(fakeUsersRepository, fakeHashRepository)
  return createUserService
}

const user = {
  email: 'user@usermail.com',
  password: 'password',
  name: 'username'
}

describe('LoginService', () => {
  it('should login a registered user', async () => {
    const loginService = makeSut()
    const createUserService = makeCreateUserService()

    await createUserService.run(user)
    const { name, ...loginData } = user

    const login = await loginService.run(loginData)

    expect(login).toHaveProperty('token')
    expect(login).toHaveProperty('user')
  })

  it('should fail to login a user not registered', () => {
    const loginService = makeSut()

    const loginData = {
      email: 'wrongUser@usermail.com',
      password: 'wrongPassword'
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(loginService.run(loginData)).rejects.toBeInstanceOf(ValidationError)
  })

  it('should fail to login a registered user with worng password', () => {
    const loginService = makeSut()

    const { name, ...loginData } = user
    loginData.password = 'wrongPassword'

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(loginService.run(loginData)).rejects.toBeInstanceOf(ValidationError)
  })
})
