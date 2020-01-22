import { Util } from "./"

export interface UserRoot {
  /** User ID. */
  id: Util.UUID
  version: number
  space_views: Util.UUID[]
  left_spaces: Util.UUID[]
}