import GetLeafletApiService from '@modules/leaflets/services/get_leaflet_api_service'
import GetLeafletAsTextService from '@modules/leaflets/services/get_leaflet_as_text_service'
import GetLeafletSideEffectsService from '@modules/leaflets/services/get_leaflet_side_effects_service'
import AppResponse from '@shared/helpers/AppResponse'
import { getSanitizedRequest } from '@shared/infra/http/middlewares/sanitize_request'
import { notFound } from '@shared/messages/en'
import { NextFunction, Request, Response } from 'express'

class LeafletController {
  public async get (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { leafletId } = getSanitizedRequest(request)
      const getLeafletService = new GetLeafletApiService()
      const leafletPdf = await getLeafletService.run(leafletId)

      if (!leafletPdf) {
        return response.json(AppResponse(false, notFound('Leaflet'), null, null))
      }

      const leafletAstextService = new GetLeafletAsTextService()
      const leafletText = await leafletAstextService.run(leafletPdf)

      return response.json(AppResponse(true, null, leafletText, null))
    } catch (error) {
      if ((error as Error).name === 'ApiError') {
        (error as Error).name = 'ValidationError'
      }

      next(error)
    }
  }

  public async getLeafletAsPdf (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { leafletId } = getSanitizedRequest(request)
      const getLeafletService = new GetLeafletApiService()
      const leafletPdf = await getLeafletService.run(leafletId)

      if (!leafletPdf) {
        return response.json(AppResponse(false, notFound('Leaflet'), null, null))
      }

      response.setHeader('Content-Type', 'application/pdf')
      response.setHeader('Content-Disposition', 'attachment; filename=name.Pdf')
      response.setHeader('Content-Length', leafletPdf.length)

      return response.end(leafletPdf)
    } catch (error) {
      if ((error as Error).name === 'ApiError') {
        (error as Error).name = 'ValidationError'
      }

      next(error)
    }
  }

  public async getSideEffects (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { leafletId } = getSanitizedRequest(request)
      const getLeafletService = new GetLeafletApiService()
      const leafletPdf = await getLeafletService.run(leafletId)

      if (!leafletPdf) {
        return response.json(AppResponse(false, notFound('Leaflet'), null, null))
      }

      const leafletAstextService = new GetLeafletAsTextService()
      const leafletText = await leafletAstextService.run(leafletPdf)

      const getLeafletSideEffectsService = new GetLeafletSideEffectsService()
      const sideEffects = getLeafletSideEffectsService.run(leafletText)

      return response.json(AppResponse(true, null, sideEffects, null))
    } catch (error) {
      if ((error as Error).name === 'ApiError') {
        (error as Error).name = 'ValidationError'
      }

      next(error)
    }
  }
}

export default LeafletController
