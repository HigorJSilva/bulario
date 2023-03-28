import GetLeafletAsTextService from './get_leaflet_as_text_service'
import GetLeafletSideEffectsService from './get_leaflet_side_effects_service'
import { readFileSync } from 'fs'

const makeSut = (): GetLeafletSideEffectsService => {
  const getLeafletSideEffectsService = new GetLeafletSideEffectsService()
  return getLeafletSideEffectsService
}

const makeGetLeafletAsTextService = (): GetLeafletAsTextService => {
  const getLeafletasTextService = new GetLeafletAsTextService()
  return getLeafletasTextService
}

describe('Get side effects service', () => {
  it('should get side effects given leaflet text', async () => {
    const leafletPdf = readFileSync('src/shared/tests/helpers/leafletPdf.txt')

    const getLeafletasTextService = makeGetLeafletAsTextService()
    const leaflet = await getLeafletasTextService.run(leafletPdf)

    const getLeafletSideEffectsService = makeSut()
    const sideEffects = getLeafletSideEffectsService.run(leaflet)

    expect(typeof (sideEffects)).not.toBe(null)
  })

  it('should return null when side effects not found in leaflet text', () => {
    const getLeafletSideEffectsService = makeSut()
    const sideEffects = getLeafletSideEffectsService.run('bad leaflet text')

    expect(sideEffects).toBe(null)
  })
})
