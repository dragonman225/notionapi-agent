import { UUID } from "../../models/common";

/**
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
export interface Error {
  errorId: UUID
  name: string
  message: string
  status: string
}