import { requiredMessage } from '@shared/messages/en'
import { body } from 'express-validator'

export const GetLeafletRequest = [
  body('leafletId')
    .notEmpty().withMessage(requiredMessage),
  body('registryNumber')
    .notEmpty().withMessage(requiredMessage)
]
