import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { handleErrorMessage } from './error_message_handler'
import AppResponse from '@shared/helpers/AppResponse'

export function validateRequest (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorsArray = handleErrorMessage(errors.array())

    res.status(422).json(AppResponse(false, 'Bad Request', null, errorsArray))
    return
  }

  next()
}
