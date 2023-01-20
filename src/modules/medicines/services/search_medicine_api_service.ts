import fetch from 'node-fetch'
import { Medicine } from '../domain/models/medicine'
import https from 'https'

class SearchMedicineApiService {
  public async run (productName: string, page = 1): Promise<Medicine[]> {
    const api = await fetch(`https://consultas.anvisa.gov.br/api/consulta/bulario?count=10&filter%5BnomeProduto%5D=${productName}&page=${page}`, {
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
