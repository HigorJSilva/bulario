import { fieldSizeMessage, requiredMessage } from '@shared/messages/en'
import { query } from 'express-validator'

export const SearchMedicineRequest = [
  query('productName')
    .notEmpty().withMessage(requiredMessage).bail()
    .isLength({ min: 2 }).withMessage(fieldSizeMessage(2)),
  query('page')
    .optional()
    .isNumeric()
]
