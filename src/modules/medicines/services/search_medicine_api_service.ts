import fetch from 'node-fetch'
import { Medicine } from '../domain/models/medicine'
import https from 'https'

interface SearchMedicineParams {
  productName?: string
  page?: number
  registryNumber?: string
}
class SearchMedicineApiService {
  public async run (searchParams: SearchMedicineParams): Promise<Medicine[]> {
    // @ts-expect-error
    const params = new URLSearchParams({
      count: 10,
      ...(searchParams.productName) && { 'filter[nomeProduto]': searchParams.productName },
      ...(searchParams.registryNumber) && { 'filter[numeroRegistro]': searchParams.registryNumber },
      page: searchParams.page ?? 1
    }).toString()

    const api = await fetch(`https://consultas.anvisa.gov.br/api/consulta/bulario?${params}`, {
      method: 'GET',
      agent: new (https.Agent)({ rejectUnauthorized: false }),
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: 'Guest',
        'cache-control': 'no-cache',
        pragma: 'no-cache'
      }
    })

    const response = await api.json()

    return response.content as Medicine[]
  }
}

export default SearchMedicineApiService
