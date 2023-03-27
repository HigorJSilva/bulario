import { requiredMessage } from '@shared/messages/en'
import { body, param } from 'express-validator'

export const UpdateMedicationRequest = [
  body('name')
    .notEmpty().withMessage(requiredMessage),
  param('id')
    .notEmpty().withMessage(requiredMessage)
]
