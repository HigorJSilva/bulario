
import GetMedicineApiService from '@modules/medicines/services/get_medicine_api_service'
import SearchMedicineApiService from '@modules/medicines/services/search_medicine_api_service'
import AppResponse from '@shared/helpers/AppResponse'
import { getSanitizedRequest } from '@shared/infra/http/middlewares/sanitize_request'
import { NextFunction, Request, Response } from 'express'

class MedicineController {
  public async search (request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { productName, page } = getSanitizedRequest(request)
    const searchMedicineService = new SearchMedicineApiService()
    const medicines = await searchMedicineService.run(productName, page)

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
}
export default MedicineController
