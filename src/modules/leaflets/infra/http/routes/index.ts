
import express from 'express'
import { validateRequest } from '@shared/infra/http/middlewares/validate_request'
import LeafletController from '../controller/leaflet_controller'
import { GetLeafletRequest } from '../middlewares/get_leaflet_request'
import RedisCache from '@shared/infra/cache/redis'

const router = express.Router()
const leafletController = new LeafletController(RedisCache)

router.post('/', GetLeafletRequest, validateRequest, leafletController.get)
router.post('/pdf', GetLeafletRequest, validateRequest, leafletController.getLeafletAsPdf)
router.post('/side-effects', GetLeafletRequest, validateRequest, leafletController.getSideEffects)

export default router
