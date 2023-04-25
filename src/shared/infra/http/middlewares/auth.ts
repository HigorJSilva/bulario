import { IUsersRepository } from '@modules/users/data/users_repository_interface'
import { IUser } from '@modules/users/domain/user_interface'
import { IJwtProvider } from '@shared/data/jwt_provider_interface'
import { UnauthenticatedError, UnauthorizedError } from '@shared/exceptions'
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
        next(new UnauthenticatedError())
        return
      }

      const jwtProvider = container.resolve<IJwtProvider>('JwtProvider')
      const usersRepository = container.resolve<IUsersRepository>('UsersRepository')

      let decodedToken
      try {
        decodedToken = jwtProvider.verify<IUser>(token.split(' ')[1])
      } catch (error) {
        next(new UnauthenticatedError())
        return
      }
      const user: IUser | null = await usersRepository.findById(decodedToken.id)

      if (!user) {
        next(new UnauthenticatedError())
        return
      }

      req.params.userId = user.id

      if (roles.length && !roles.includes(user.role)) {
        next(new UnauthorizedError())
        return
      }
      next()
    }
  ]
}
