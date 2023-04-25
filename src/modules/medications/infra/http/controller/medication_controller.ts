
import CreateMedicationService from '@modules/medications/services/create_medication_service'
import DeleteMedicationService from '@modules/medications/services/delete_medication_service'
import GetSideEffectsService from '@modules/medications/services/get_side_effects_service'
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
      const medication = await createMedicationService.run(medicationData)
      next()
      return response.json(medication)
    } catch (error) {
      next(error)
    }
  }

  public async update (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const medicationData = getSanitizedRequest(request)

      const updateMedicationService = container.resolve(UpdateMedicationService)
      const medication = await updateMedicationService.run(medicationData)
      next()
      return response.json(medication)
    } catch (error) {
      next(error)
    }
  }

  public async list (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const listMedicationService = container.resolve(ListMedicationService)
      const medication = await listMedicationService.run(request.params.userId)
      next()
      return response.json(medication)
    } catch (error) {
      next(error)
    }
  }

  public async delete (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const deleteData = getSanitizedRequest(request)

      const deleteMedicationService = container.resolve(DeleteMedicationService)
      const medication = await deleteMedicationService.run(deleteData.id)
      next()
      return response.json(medication)
    } catch (error) {
      next(error)
    }
  }

  public async getSideEffecs (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const getSideEffecsData = getSanitizedRequest(request)

      const getSideEffectsService = container.resolve(GetSideEffectsService)
      const sideEffects = await getSideEffectsService.run(getSideEffecsData.id)
      next()
      return response.json(sideEffects)
    } catch (error) {
      next(error)
    }
  }
}
export default MedicationController
