import { requiredMessage } from '@shared/messages/en'
import { param } from 'express-validator'

export const GetMedicineRequest = [
  param('processNumber')
    .notEmpty().withMessage(requiredMessage).bail()
]
