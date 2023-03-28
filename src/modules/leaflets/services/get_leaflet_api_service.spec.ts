import GetLeafletApiService from './get_leaflet_api_service'
import SearchMedicineApiService from '@modules/medicines/services/search_medicine_api_service'

const makeSut = (): GetLeafletApiService => {
  const getLeafletService = new GetLeafletApiService()
  return getLeafletService
}

const getLeafLetId = async (): Promise<string> => {
  const searchMedicineApiService = new SearchMedicineApiService()
  const leaflet = await searchMedicineApiService.run({ registryNumber: '135690626' })
  return leaflet[0].idBulaPacienteProtegido
}

describe('Get leaflet service', () => {
  it('should get leaflet pdf givin an id', async () => {
    const getLeafletService = makeSut()

    const leaflet = await getLeafletService.run(await getLeafLetId())

    expect(leaflet).toBeInstanceOf(Buffer)
  })
})
