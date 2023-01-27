import PdfParse from 'pdf-parse'

class GetLeafletAsTextService {
  public async run (pdfBuffer: Buffer): Promise<any | undefined> {
    const pdfAsText = await PdfParse(pdfBuffer)
    return pdfAsText.text
  }
}

export default GetLeafletAsTextService
