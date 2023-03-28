// import GetLeafletApiService from './get_leaflet_api_service'
// import SearchMedicineApiService from '@modules/medicines/services/search_medicine_api_service'
import GetLeafletAsTextService from './get_leaflet_as_text_service'
import { readFileSync } from 'fs'

const makeSut = (): GetLeafletAsTextService => {
  const getLeafletasTextService = new GetLeafletAsTextService()
  return getLeafletasTextService
}

describe('Get leaflet as text service', () => {
  it('should get leaflet text givin a pdf buffer', async () => {
    const leafletPdf = readFileSync('src/shared/tests/helpers/leafletPdf.txt')

    const getLeafletasTextService = makeSut()
    const leaflet = await getLeafletasTextService.run(leafletPdf)

    expect(typeof (leaflet)).toStrictEqual(expect.any(String))
  })
})
