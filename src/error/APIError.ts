import { ErrorResponse } from "../interfaces/notion-api"

/**
 * @category Error
 */
export class APIError extends Error {
  name = "APIError"

  constructor (error: ErrorResponse) {
    super()
    Object.setPrototypeOf(this, APIError.prototype)
    this.message = `Server says "${error.name}: ${error.message}`
    if (error.status) {
      this.message += ` Status: ${error.status}`
    }
    this.message += `"`
  }
}