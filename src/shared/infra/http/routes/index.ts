import express from 'express'
import medicinesRoutes from '@modules/medicines/infra/http/routes'
import leafletsRoutes from '@modules/leaflets/infra/http/routes'
import usersRoutes from '@modules/users/infra/http/routes'
import medicationRoutes from '@modules/medications/infra/http/routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../helpers/swagger_output.json'

const routes = express.Router()

routes.use('/medicines', medicinesRoutes)
routes.use('/leaflets', leafletsRoutes)
routes.use('/users', usersRoutes)
routes.use('/medications', medicationRoutes)
routes.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default routes
