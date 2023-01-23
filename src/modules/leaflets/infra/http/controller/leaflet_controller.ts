import GetLeafletApiService from '@modules/leaflets/services/get_leaflet_api_service'
import GetLeafletAsTextService from '@modules/leaflets/services/get_leaflet_as_text_service'
import AppResponse from '@shared/helpers/AppResponse'
import { getSanitizedRequest } from '@shared/infra/http/middlewares/sanitize_request'
import { notFound } from '@shared/messages/en'
import { NextFunction, Request, Response } from 'express'

class LeafletController {
  public async get (request: Request, response: Response, _: NextFunction): Promise<Response> {
    const { leafletId } = getSanitizedRequest(request)
    const getLeafletService = new GetLeafletApiService()
    const leafletPdf = await getLeafletService.run(leafletId)

    if (!leafletPdf) {
      return response.json(AppResponse(false, notFound('Leaflet'), null, null))
    }

    const leafletAstextService = new GetLeafletAsTextService()
    const leafletText = await leafletAstextService.run(leafletPdf)

    return response.json(AppResponse(true, null, leafletText, null))
  }
}

export default LeafletController
