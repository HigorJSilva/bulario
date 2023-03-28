import { ValidationError } from '@shared/exceptions'
import FakeHashProvider from '@shared/infra/hash/fake/fake_hash_provider'
import FakeUsersRepository from '../repository/fake_users_repository'
import CreateUserService from './create_user_service'

const makeSut = (): CreateUserService => {
  const fakeUsersRepository = new FakeUsersRepository()
  const fakeHashRepository = new FakeHashProvider()

  const createUserService = new CreateUserService(fakeUsersRepository, fakeHashRepository)
  return createUserService
}

describe('CreateUser', () => {
  it('should create a new user', async () => {
    const createUserService = makeSut()

    const user = await createUserService.run({
      email: 'user@usermail.com',
      name: 'username',
      password: 'password'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not create user with used email', async () => {
    const createUserService = makeSut()

    await createUserService.run({
      email: 'user@usermail.com',
      name: 'username',
      password: 'password'
    })

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(
      createUserService.run({
        email: 'user@usermail.com',
        name: 'username',
        password: 'password'
      })
    ).rejects.toBeInstanceOf(ValidationError)
  })
})
