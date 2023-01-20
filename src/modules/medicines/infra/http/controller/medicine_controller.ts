
import SearchMedicineApiService from '@modules/medicines/services/search_medicine_api_service'
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
}
export default MedicineController
