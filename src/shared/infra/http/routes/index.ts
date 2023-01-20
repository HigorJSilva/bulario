import express from 'express'
import medicinesRoutes from '@modules/medicines/infra/http/routes'

const routes = express.Router()

routes.use('/medicines', medicinesRoutes)

export default routes
