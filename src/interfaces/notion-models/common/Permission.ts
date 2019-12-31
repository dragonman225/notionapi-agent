import { UUID } from "./util"

/** 
 * Role of an user.
 * 
 * In a page of a personal workspace, "editor" usually means owner, 
 * and "read_and_write" usually means other users added as collaborators.
 */
export type PermissionRole =
  "editor" | "reader" | "none" | "read_and_write"

/** 
 * Permission an anonymous user has.
 */
export interface PublicPermission {
  type: "public_permission"
  /** The anonymous user's role. */
  role: PermissionRole
  allow_duplicate?: boolean
  allow_search_engine_indexing?: boolean
}

/** 
 * Permission a Notion user has.
 * 
 * A {@link NotionUser} is a registered user.
 */
export interface UserPermission {
  type: "user_permission"
  /** The Notion user's role. */
  role: PermissionRole
  user_id: UUID
}

/** 
 * Permission a group has.
 * 
 * A {@link Group} consists of Notion users.
 */
export interface GroupPermission {
  type: "group_permission"
  /** The group's role. */
  role: PermissionRole
  group_id: UUID
}

export type Permission =
  PublicPermission | UserPermission | GroupPermission
