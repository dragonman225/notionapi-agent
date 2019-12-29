export class RequestError extends Error {
  name = "RequestError"

  constructor (message: string) {
    super()
    Object.setPrototypeOf(this, RequestError.prototype)
    this.message = message
  }
}