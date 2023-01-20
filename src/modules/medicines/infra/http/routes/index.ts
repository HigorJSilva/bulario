
import { validateRequest } from '@shared/infra/http/middlewares/validate_request'
import express from 'express'
import MedicineController from '../controller/medicine_controller'
import { SearchMedicineRequest } from '../middleware/search_medicine_request'

const router = express.Router()
const medicineController = new MedicineController()

router.get('/', SearchMedicineRequest, validateRequest, medicineController.search)

export default router
