import { requiredMessage } from '@shared/messages/en'
import { param } from 'express-validator'

export const DeleteMedicineRequest = [

  param('id')
    .notEmpty().withMessage(requiredMessage)
]
