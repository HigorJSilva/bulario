
import CreateMedicationService from '@modules/medications/services/create_medication_service'
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
}
export default MedicationController
