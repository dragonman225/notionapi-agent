import { Util } from "./"

export type Permission =
  Permission.PublicPermission | Permission.UserPermission |
  Permission.GroupPermission

export namespace Permission {

  /**
  * Role of an user.
  * 
  * In a page of a personal workspace, "editor" usually means owner, 
  * and "read_and_write" usually means other users added as collaborators.
  */
  export type Role =
    "editor" | "reader" | "none" | "read_and_write"

  /** 
   * Permission an anonymous user has.
   */
  export interface PublicPermission {
    type: "public_permission"
    /** The anonymous user's role. */
    role: Role
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
    role: Role
    user_id: Util.UUID
  }

  /** 
   * Permission a group has.
   * 
   * A {@link Group} consists of Notion users.
   */
  export interface GroupPermission {
    type: "group_permission"
    /** The group's role. */
    role: Role
    group_id: Util.UUID
  }

}