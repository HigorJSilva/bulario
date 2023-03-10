
import express from 'express'
import { validateRequest } from '@shared/infra/http/middlewares/validate_request'
import MedicineController from '../controller/medicine_controller'
import { GetMedicineRequest } from '../middleware/get_medicine_request'
import { SearchMedicineRequest } from '../middleware/search_medicine_request'

const router = express.Router()
const medicineController = new MedicineController()

router.get('/:processNumber', GetMedicineRequest, validateRequest, medicineController.get)
router.get('/', SearchMedicineRequest, validateRequest, medicineController.search)

export default router
