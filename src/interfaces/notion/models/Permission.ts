import { UUID } from "./common"

/** 
 * Role of an entity (for now, only human user).
 */
export type EntityRole =
  "editor" | "reader" | "none"

/** 
 * Describe permission of an entity (for now, only human user).
 */
export interface Permission {
  /** I have seen only `user_permission`. */
  type: "user_permission" | string
  user_id: UUID
  /** The entity's role. */
  role: EntityRole
  allow_duplicate?: boolean
  allow_search_engine_indexing?: boolean
}
