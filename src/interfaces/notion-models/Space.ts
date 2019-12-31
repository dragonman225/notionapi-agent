import { UUID, Timestamp, Table } from "./common/util"
import { UserPermission } from "./common/Permission"

export interface Group {
  id: UUID
  name: string
  user_ids?: UUID[]
}

/**
 * Describe a workspace.
 */
export interface Space {
  id: UUID
  version: number
  name: string
  permissions: UserPermission[]
  permission_groups?: Group[]
  beta_enabled: boolean
  /** Top level pages. */
  pages: UUID[]
  created_by: UUID
  created_time: Timestamp
  created_by_table: Table
  created_by_id: UUID
  last_edited_by: UUID
  last_edited_time: Timestamp
  last_edited_by_table: Table
  last_edited_by_id: UUID
}