import { UnauthenticatedError, UnauthorizedError, ValidationError } from '@shared/exceptions'
import AppResponse from '@shared/helpers/AppResponse'
import { internalError, unauthenticatedUser, unauthorizedUser } from '@shared/messages/en'
import { Request, Response, NextFunction } from 'express'

function errorHandler (err: TypeError, _: Request, res: Response, next: NextFunction): void {
  switch (true) {
    case err instanceof UnauthorizedError:
      res.status(403).json(
        AppResponse(
          false,
          unauthorizedUser,
          null,
          null
        )
      )
      break

    case err instanceof UnauthenticatedError:
      res.status(401).json(
        AppResponse(
          false,
          unauthenticatedUser,
          null,
          null
        )
      )
      break

    case err instanceof ValidationError:
      res.status(422).json(
        AppResponse(
          false,
          err.message,
          null,
          null
        )
      )
      break

    default:
      console.log(err)
      res.status(500).json(
        AppResponse(
          false,
          internalError,
          null,
          null
        )
      )
      break
  }

  next()
}

export default errorHandler
