import fetch, { RequestInit } from 'node-fetch'
import https from 'https'
import AbortController from '@shared/infra/http/helpers/AbortRequest'
import { invalidLeafletId } from '@shared/messages/en'
import { ValidationError } from '@shared/exceptions'

class GetLeafletApiService {
  public async run (leafletId: string): Promise<Buffer | undefined> {
    const controller = AbortController.getController()
    const timeout = AbortController.getTimeout()
    let leafletPdf

    try {
      const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/medicamentos/arquivo/bula/parecer/${leafletId}/?Authorization=`, {
        method: 'GET',
        signal: controller.signal as NonNullable<RequestInit['signal']>,
        agent: new (https.Agent)({ rejectUnauthorized: false }),
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: 'Guest',
          'cache-control': 'no-cache',
          pragma: 'no-cache'
        }
      })

      leafletPdf = await response.buffer()
    } catch (error) {
      throw new ValidationError(invalidLeafletId)
    } finally {
      clearTimeout(timeout)
    }

    return leafletPdf
  }
}

export default GetLeafletApiService
