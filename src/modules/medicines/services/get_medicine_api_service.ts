import fetch from 'node-fetch'
import { Medicine } from '../domain/models/medicine'
import https from 'https'
import { invalidProcessNumber } from '@shared/messages/en'
import { ValidationError } from '@shared/exceptions'

class GetMedicineApiService {
  public async run (processNumber: string): Promise<Medicine> {
    const api = await fetch(`https://consultas.anvisa.gov.br/api/consulta/medicamento/produtos/${processNumber}`, {
      method: 'GET',
      agent: new (https.Agent)({ rejectUnauthorized: false }),
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: 'Guest',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        cookie: '_TRAEFIK_BACKEND=http://10.0.2.51:8080; FGTServer=2DE20D8040A1176F71792EB219E8DA9BCEDF996805D330F1AFAB13D5103423AE685570373EACB70B61CDD992CE85'
      }
    })

    if (api.headers.get('content-encoding') !== 'gzip') {
      throw new ValidationError(invalidProcessNumber)
    }
    const response = await api.json()

    return response
  }
}

export default GetMedicineApiService
