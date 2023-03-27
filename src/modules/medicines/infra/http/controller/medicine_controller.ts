
import GetLeafletApiService from '@modules/leaflets/services/get_leaflet_api_service'
import GetMedicationService from '@modules/medications/services/get_medication_service'
import GetLeafletAsTextService from '@modules/leaflets/services/get_leaflet_as_text_service'
import DeleteMedicineService from '@modules/medicines/services/delete_mecine_service'
import GetMedicineApiService from '@modules/medicines/services/get_medicine_api_service'
import SearchMedicineApiService from '@modules/medicines/services/search_medicine_api_service'
import AppResponse from '@shared/helpers/AppResponse'
import { getSanitizedRequest } from '@shared/infra/http/middlewares/sanitize_request'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import GetLeafletSideEffectsService from '@modules/leaflets/services/get_leaflet_side_effects_service'
import Medicines from '../../db/models/medicines_model'

class MedicineController {
  constructor () {
    this.getSideEffectsFromMedication = this.getSideEffectsFromMedication.bind(this)
    this.generateSideEffecs = this.generateSideEffecs.bind(this)
  }

  public async search (request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { productName, page } = getSanitizedRequest(request)
    const searchMedicineService = new SearchMedicineApiService()
    const medicines = await searchMedicineService.run({ productName, page })

    next()
    return response.json(medicines)
  }

  public async get (request: Request, response: Response, next: NextFunction): Promise<Response | null> {
    try {
      const { processNumber } = getSanitizedRequest(request)
      const getMedicineService = new GetMedicineApiService()
      const medicine = await getMedicineService.run(processNumber)

      if (medicine) {
        return response.status(200).json(AppResponse(true, null, medicine, null))
      }

      return response.status(422).json(AppResponse(false, null, null, medicine))
    } catch (error) {
      next(error)

      return null
    }
  }

  public async delete (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const deleteData = getSanitizedRequest(request)

      const deleteMedicineService = container.resolve(DeleteMedicineService)
      const medicine = await deleteMedicineService.run(deleteData.id)
      next()
      return response.json(medicine)
    } catch (error) {
      next(error)
    }
  }

  public generateSideEffecs (request: Request, response: Response, next: NextFunction): Response {
    const { id } = getSanitizedRequest(request)
    this.getSideEffectsFromMedication(id).then(() => {
      // TODO: notify user
    }).catch(() => {
      next(new Error('generate side effects error'))
    })
    return response.json(AppResponse(true, 'gerando resultado', null, null))
  }

  public async getSideEffectsFromMedication (id: string): Promise<void> {
    const getMedicationService = container.resolve(GetMedicationService)

    const medication = await getMedicationService.run(id)

    for (const medicine of medication.medicines) {
      console.log(`Looking for ${medicine.name}`)

      const leafletId = await this.getLeafletId(medicine)

      if (!leafletId) {
        console.log(`${medicine.name} not found `)
        continue
      }

      const leafletPdf = await this.getLeafletPdf(leafletId)

      if (!leafletPdf) {
        console.log(`${medicine.name} PDF not found `)
        continue
      }

      // TODO: store in database
      await this.getSideEffects(leafletPdf)
    }
  }

  private async getLeafletId (medicine: Medicines): Promise <string | null> {
    const searchMedicineService = container.resolve(SearchMedicineApiService)
    const response = await searchMedicineService.run({ registryNumber: medicine.registryNumber })

    if (!response) {
      return null
    }

    return response[0].idBulaPacienteProtegido
  }

  private async getLeafletPdf (leafletId: string): Promise <Buffer | null> {
    const getLeafletAsPdf = container.resolve(GetLeafletApiService)
    const leafletPdf = await getLeafletAsPdf.run(leafletId)

    if (!leafletPdf) {
      return null
    }

    return leafletPdf
  }

  private async getSideEffects (leafletPdf: Buffer): Promise<string | null> {
    const leafletAstextService = container.resolve(GetLeafletAsTextService)
    const leafletText = await leafletAstextService.run(leafletPdf)

    const getLeafletSideEffectsService = new GetLeafletSideEffectsService()
    const sideEffects = getLeafletSideEffectsService.run(leafletText)
    return sideEffects
  }
}
export default MedicineController
