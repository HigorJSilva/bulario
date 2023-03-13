import LoginService from '@modules/users/services/login_service'
import { getSanitizedRequest } from '@shared/infra/http/middlewares/sanitize_request'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

class AuthController {
  public async login (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const loginUserService = container.resolve(LoginService)
      const user = await loginUserService.run(getSanitizedRequest(request))
      next()
      return response.json(user)
    } catch (error) {
      next(error)
    }
  }
}
export default AuthController
