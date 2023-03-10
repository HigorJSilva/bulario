import CreateUserService from '@modules/users/services/create_user_service'
import { getSanitizedRequest } from '@shared/infra/http/middlewares/sanitize_request'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { container, injectable } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'
@injectable()
class UsersController {
  public async create (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const createUserService = container.resolve(CreateUserService)
      const user = await createUserService.run(getSanitizedRequest(request))

      next()
      return response.json(user)
    } catch (error) {
      if ((error as Error).name === 'ApiError') {
        (error as Error).name = 'ValidationError'
      }

      next(error)
    }
  }
}
export default UsersController
