
import { authorize } from '@shared/infra/http/middlewares/auth'
import { validateRequest } from '@shared/infra/http/middlewares/validate_request'
import express from 'express'
import MedicationController from '../controller/medication_controller'
import { CreateMedicationRequest } from '../middlewares/create_medication_request'
import { DeleteMedicationRequest } from '../middlewares/delete_medication_request'
import { UpdateMedicationRequest } from '../middlewares/update_medication_request'

const router = express.Router()
const medicationController = new MedicationController()

router.get('/', authorize(), medicationController.list)
router.post('/', authorize(), CreateMedicationRequest, validateRequest, medicationController.create)
router.put('/:id', authorize(), UpdateMedicationRequest, validateRequest, medicationController.update)
router.delete('/:id', authorize(), DeleteMedicationRequest, validateRequest, medicationController.delete)

export default router
