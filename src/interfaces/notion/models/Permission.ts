import { UUID } from "./common"

/** 
 * Role of an entity.
 * 
 * In a page of a personal workspace, "editor" usually means owner, 
 * while "read_and_write" usually means other users added as collaborators.
 */
export type EntityRole =
  "editor" | "reader" | "none" | "read_and_write"

/** 
 * Describe permission of a public entity to access a page.
 */
export interface PublicPermission {
  type: "public_permission"
  /** The public entity's role. */
  role: EntityRole
  allow_duplicate?: boolean
  allow_search_engine_indexing?: boolean
}

/** 
 * Describe permission of a Notion user to access a space or a page.
 */
export interface UserPermission {
  type: "user_permission"
  /** The Notion user's role. */
  role: EntityRole
  /** The Notion user's ID. */
  user_id: UUID
}
