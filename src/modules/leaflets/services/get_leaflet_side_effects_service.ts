class GetLeafletSideEffectsService {
  public run (leafLetText: string): string | null {
    // eslint-disable-next-line
    const regex = new RegExp('(?<=8\. Q)(.|\r|\n)+?(?=(9.))')
    const sideEffects = leafLetText.match(regex)
    if (sideEffects) {
      return 'Q' + sideEffects[0]
    }
    return null
  }
}

export default GetLeafletSideEffectsService
