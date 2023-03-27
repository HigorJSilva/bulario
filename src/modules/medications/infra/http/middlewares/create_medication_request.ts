import { requiredMessage } from '@shared/messages/en'
import { body } from 'express-validator'

export const CreateMedicationRequest = [
  body('name')
    .notEmpty().withMessage(requiredMessage),
  body('medicines.*.name')
    .notEmpty().withMessage(requiredMessage),
  body('medicines.*.registryNumber')
    .notEmpty().withMessage(requiredMessage)
]
