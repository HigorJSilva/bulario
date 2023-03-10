
import { validateRequest } from '@shared/infra/http/middlewares/validate_request'
import express from 'express'
import AuthController from '../controller/auth_controler'
import UsersController from '../controller/users_controller'
import { CreateUserRequest } from '../middlewares/create_user_request'
import { LoginRequest } from '../middlewares/login_request'

const router = express.Router()
const usersController = new UsersController()
const authController = new AuthController()

router.post('/login', LoginRequest, validateRequest, authController.login)
router.post('/', CreateUserRequest, validateRequest, usersController.create)

export default router
