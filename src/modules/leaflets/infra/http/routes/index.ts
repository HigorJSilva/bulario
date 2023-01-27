
import express from 'express'
import { validateRequest } from '@shared/infra/http/middlewares/validate_request'
import LeafletController from '../controller/leaflet_controller'
import { GetLeafletRequest } from '../middlewares/get_leaflet_request'

const router = express.Router()
const leafletController = new LeafletController()

router.post('/', GetLeafletRequest, validateRequest, leafletController.get)
router.post('/pdf', GetLeafletRequest, validateRequest, leafletController.getLeafletAsPdf)

export default router
