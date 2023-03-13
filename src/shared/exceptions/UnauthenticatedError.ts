export class UnauthenticatedError extends Error {
  constructor () {
    super()
    Object.setPrototypeOf(this, UnauthenticatedError.prototype)
  }
}
