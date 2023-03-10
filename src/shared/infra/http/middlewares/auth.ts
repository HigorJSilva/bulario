import { IUsersRepository } from '@modules/users/data/users_repository_interface'
import { IUser } from '@modules/users/domain/user_interface'
import { IJwtProvider } from '@shared/data/jwt_provider_interface'
import { unauthenticatedUser, unauthorizedUser } from '@shared/messages/en'
import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'

export function authorize (roles: string[] | string = []): any {
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return [
    async (req: Request, _: Response, next: NextFunction) => {
      const token = req.headers.authorization as string

      if (!token) {
        const unAuthenticatedError = Error(unauthenticatedUser)

        unAuthenticatedError.name = 'UnauthenticatedError'
        next(unAuthenticatedError)
        return
      }

      const jwtProvider = container.resolve<IJwtProvider>('JwtProvider')
      const usersRepository = container.resolve<IUsersRepository>('UsersRepository')

      const decodedToken = jwtProvider.verify<IUser>(token.split(' ')[1])
      const user: IUser | null = await usersRepository.findById(decodedToken.id)

      if (!user) {
        const unAuthenticatedError = Error(unauthenticatedUser)

        unAuthenticatedError.name = 'UnauthenticatedError'
        next(unAuthenticatedError)
        return
      }

      req.params.userId = user.id

      if (roles.length && !roles.includes(user.role)) {
        const unauthorizedError = Error(unauthorizedUser)

        unauthorizedError.name = 'UnauthorizedError'
        next(unauthorizedError)
        return
      }
      next()
    }
  ]
}
