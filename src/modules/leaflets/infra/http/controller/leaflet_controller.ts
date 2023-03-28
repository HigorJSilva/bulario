import GetLeafletApiService from '@modules/leaflets/services/get_leaflet_api_service'
import GetLeafletAsTextService from '@modules/leaflets/services/get_leaflet_as_text_service'
import GetLeafletSideEffectsService from '@modules/leaflets/services/get_leaflet_side_effects_service'
import { ICacheProvider } from '@shared/data/cache_provider_interface'
import AppResponse from '@shared/helpers/AppResponse'
import { getSanitizedRequest } from '@shared/infra/http/middlewares/sanitize_request'
import { notFound } from '@shared/messages/en'
import { NextFunction, Request, Response } from 'express'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { container, inject, injectable } from 'tsyringe'
@injectable()
class LeafletController {
  constructor (
    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider
  ) {
    this.get = this.get.bind(this)
    this.getLeafletAsPdf = this.getLeafletAsPdf.bind(this)
    this.getSideEffects = this.getSideEffects.bind(this)
  }

  public async get (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { leafletId, registryNumber } = getSanitizedRequest(request)

      const leafletPdf = await this.getPdfBuffer(leafletId, registryNumber)

      if (!leafletPdf) {
        return response.json(AppResponse(false, notFound('Leaflet'), null, null))
      }

      const leafletAstextService = container.resolve(GetLeafletAsTextService)
      const leafletText = await leafletAstextService.run(leafletPdf)

      return response.json(AppResponse(true, null, leafletText, null))
    } catch (error) {
      next(error)
    }
  }

  public async getLeafletAsPdf (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { leafletId, registryNumber } = getSanitizedRequest(request)
      let leafletPdf = await this.getPdfBuffer(leafletId, registryNumber) as {type: string, data: Buffer } | undefined | Buffer

      if (!leafletPdf) {
        return response.json(AppResponse(false, notFound('Leaflet'), null, null))
      }

      if (!(leafletPdf instanceof Buffer)) {
        leafletPdf = Buffer.from(leafletPdf.data)
      }

      response.setHeader('Content-Type', 'application/pdf')
      response.setHeader('Content-Disposition', 'attachment; filename=name.Pdf')
      response.setHeader('Content-Length', leafletPdf.length)

      return response.end(leafletPdf)
    } catch (error) {
      next(error)
    }
  }

  public async getSideEffects (request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { leafletId, registryNumber } = getSanitizedRequest(request)
      const leafletPdf = await this.getPdfBuffer(leafletId, registryNumber)

      if (!leafletPdf) {
        return response.json(AppResponse(false, notFound('Leaflet'), null, null))
      }

      const leafletAstextService = container.resolve(GetLeafletAsTextService)
      const leafletText = await leafletAstextService.run(leafletPdf)

      const getLeafletSideEffectsService = container.resolve(GetLeafletSideEffectsService)
      const sideEffects = getLeafletSideEffectsService.run(leafletText)

      return response.json(AppResponse(true, null, sideEffects, null))
    } catch (error) {
      next(error)
    }
  }

  private async getPdfBuffer (leafletId: string, registryNumber: string): Promise<Buffer | undefined> {
    const hasLeafletPdf = await this.cacheProvider.recover<Buffer>(registryNumber)

    let leafletPdf: Buffer | undefined
    if (hasLeafletPdf) {
      leafletPdf = hasLeafletPdf
    } else {
      const getLeafletService = container.resolve(GetLeafletApiService)
      leafletPdf = await getLeafletService.run(leafletId)
    }
    return leafletPdf
  }
}

export default LeafletController
