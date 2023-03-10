import { container } from 'tsyringe'

import { IUsersRepository } from '@modules/users/data/users_repository_interface'
import UsersRepository from '@modules/users/infra/db/repository/user_repository'
import { IHashProvider } from '@shared/data/hash_provider_interface'
import BcryptHashProvider from '@shared/infra/hash/bcrypt_hash_provider'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider)
