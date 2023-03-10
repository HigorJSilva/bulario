
import { validateRequest } from '@shared/infra/http/middlewares/validate_request'
import express from 'express'
import UsersController from '../controller/users_controller'
import { CreateUserRequest } from '../middlewares/create_user_request'

const router = express.Router()
const usersController = new UsersController()

router.post('/', CreateUserRequest, validateRequest, usersController.create)

export default router
