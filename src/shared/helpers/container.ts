import { container } from 'tsyringe'

import { IUsersRepository } from '@modules/users/data/users_repository_interface'
import UsersRepository from '@modules/users/infra/db/repository/user_repository'
import { IHashProvider } from '@shared/data/hash_provider_interface'
import BcryptHashProvider from '@shared/infra/hash/bcrypt_hash_provider'
import { ICacheProvider } from '@shared/data/cache_provider_interface'
import RedisCache from '@shared/infra/cache/redis/redis'
import JwtProvider from '@shared/infra/jwt/jwtProvider'
import { IJwtProvider } from '@shared/data/jwt_provider_interface'
import MedicationsRepository from '@modules/medications/infra/db/repository/medications_repository'
import { IMedicationsRepository } from '@modules/medications/data/medications_repository_interface'
import { IMedicinesRepository } from '@modules/medicines/data/medicines_repository'
import MedicinesRepository from '@modules/medicines/infra/db/repository/medicines_repository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider)
container.registerSingleton<ICacheProvider>('CacheProvider', RedisCache)
container.registerSingleton<IJwtProvider>('JwtProvider', JwtProvider)
container.registerSingleton<IMedicationsRepository>('MedicationsRepository', MedicationsRepository)
container.registerSingleton<IMedicinesRepository>('MedicinesRepository', MedicinesRepository)
