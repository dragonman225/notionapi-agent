import { UUID } from "./common"

/** 
 * Role of an entity.
 */
export type EntityRole =
  "editor" | "reader" | "none"

/** 
 * Describe permission of an public entity to access a page.
 */
export interface PagePermission {
  type: "public_permission"
  /** The entity's role. */
  role: EntityRole
  allow_duplicate?: boolean
  allow_search_engine_indexing?: boolean
}

/** 
 * Describe permission of a Notion user to access a space.
 */
export interface SpacePermission {
  type: "user_permission"
  /** The Notion user's role. */
  role: EntityRole
  /** The Notion user's ID. */
  user_id: UUID
}
