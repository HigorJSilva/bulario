
import express from 'express'
import { validateRequest } from '@shared/infra/http/middlewares/validate_request'
import LeafletController from '../controller/leaflet_controller'
import { GetLeafletRequest } from '../middlewares/get_leaflet_request'
import CacheService from '@shared/infra/cache/cache_service'

const router = express.Router()
const leafletController = new LeafletController(CacheService.getInstance().getCache())

router.post('/', GetLeafletRequest, validateRequest, leafletController.get)
router.post('/pdf', GetLeafletRequest, validateRequest, leafletController.getLeafletAsPdf)
router.post('/side-effects', GetLeafletRequest, validateRequest, leafletController.getSideEffects)

export default router
