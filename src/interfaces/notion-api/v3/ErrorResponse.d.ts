import { Util } from "../../"

/**
 * The error object Notion responds when an API request is invalid.
 * 
 * Example :
 * 
 * ```
 * {
 *   "errorId": "19656943-xxxx-xxxx-xxxx-748b998ef017",
 *   "name": "UnauthorizedError",
 *   "message": "Must be authenticated.",
 *   "status": "ExpiredToken"
 * }
 * ```
 */
export interface ErrorResponse {
  errorId: Util.UUID
  name: string
  message: string
  status?: string
}