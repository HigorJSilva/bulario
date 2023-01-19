import { matchedData } from 'express-validator'
import { Request } from 'express'

export function getSanitizedRequest (req: Request): any {
  return matchedData(req, {
    includeOptionals: true
  })
}
