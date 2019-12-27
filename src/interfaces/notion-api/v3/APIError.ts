import { UUID } from "../../notion-models/common/util";

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
export interface ErrorResponse {
  errorId: UUID
  name: string
  message: string
  status?: string
}