import { Util, Permission } from "./"

export interface Group {
  id: Util.UUID
  name: string
  user_ids?: Util.UUID[]
}

/**
 * Describe a workspace.
 */
export interface Space {
  id: Util.UUID
  version: number
  name: string
  permissions: Permission.UserPermission[]
  permission_groups?: Group[]
  beta_enabled: boolean
  /** Top level pages. */
  pages: Util.UUID[]
  created_by: Util.UUID
  created_time: Util.TimestampNumber
  created_by_table: Util.Table
  created_by_id: Util.UUID
  last_edited_by: Util.UUID
  last_edited_time: Util.TimestampNumber
  last_edited_by_table: Util.Table
  last_edited_by_id: Util.UUID
}