import AppResponse from '@shared/helpers/AppResponse'
import { internalError, unauthenticatedUser, unauthorizedUser } from '@shared/messages/en'
import { Request, Response, NextFunction } from 'express'

export = errorHandler;

function errorHandler (err: TypeError, _: Request, res: Response, next: NextFunction): void {
  switch (err.name) {
    case 'UnauthorizedError':
      res.status(403).json(
        AppResponse(
          false,
          unauthorizedUser,
          null,
          null
        )
      )
      break

    case 'UnauthenticatedError':
      res.status(401).json(
        AppResponse(
          false,
          unauthenticatedUser,
          null,
          null
        )
      )
      break

    case 'ValidationError':
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
