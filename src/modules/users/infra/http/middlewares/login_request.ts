import { emailNotValid, requiredMessage, weakPassword } from '@shared/messages/en'
import { body } from 'express-validator'

export const LoginRequest = [
  body('email')
    .notEmpty().withMessage(requiredMessage)
    .toLowerCase()
    .isEmail().withMessage(emailNotValid),
  body('password')
    .notEmpty().withMessage(requiredMessage)
    .isStrongPassword().withMessage(weakPassword)

]
