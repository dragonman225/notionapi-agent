import { UUID } from "../common"

export interface UserRoot {
  /** User ID. */
  id: UUID
  version: number
  space_views: UUID[]
  left_spaces: UUID[]
}