import { requiredMessage } from '@shared/messages/en'
import { param } from 'express-validator'

export const DeleteMedicationRequest = [

  param('id')
    .notEmpty().withMessage(requiredMessage)
]
