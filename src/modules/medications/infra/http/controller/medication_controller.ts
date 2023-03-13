
import CreateMedicationService from '@modules/medications/services/create_medication_service'
import ListMedicationService from '@modules/medications/services/list_medication_service'
import UpdateMedicationService from '@modules/medications/services/update_medication_service'
import { getSanitizedRequest } from '@shared/infra/http/middlewares/sanitize_request'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

class MedicationController {
  public async create (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const medicationData = getSanitizedRequest(request)
      medicationData.userId = request.params.userId

      const createMedicationService = container.resolve(CreateMedicationService)
      const user = await createMedicationService.run(medicationData)
      next()
      return response.json(user)
    } catch (error) {
      next(error)
    }
  }

  public async update (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const medicationData = getSanitizedRequest(request)

      const updateMedicationService = container.resolve(UpdateMedicationService)
      const user = await updateMedicationService.run(medicationData)
      next()
      return response.json(user)
    } catch (error) {
      next(error)
    }
  }

  public async list (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const listMedicationService = container.resolve(ListMedicationService)
      const user = await listMedicationService.run(request.params.userId)
      next()
      return response.json(user)
    } catch (error) {
      next(error)
    }
  }
}
export default MedicationController
