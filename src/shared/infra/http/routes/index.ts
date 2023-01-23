import express from 'express'
import medicinesRoutes from '@modules/medicines/infra/http/routes'
import leafletsRoutes from '@modules/leaflets/infra/http/routes'

const routes = express.Router()

routes.use('/medicines', medicinesRoutes)
routes.use('/leaflets', leafletsRoutes)

export default routes
