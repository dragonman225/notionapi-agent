import { UUID, Timestamp, TableName } from "../common"
import { UserPermission } from "../permission"

/**
 * Describe a workspace.
 */
export interface Space {
  id: UUID
  version: number
  name: string
  permissions: UserPermission[]
  beta_enabled: boolean
  /** Top level pages. */
  pages: UUID[]
  created_by: UUID
  created_time: Timestamp
  created_by_table: TableName
  created_by_id: UUID
  last_edited_by: UUID
  last_edited_time: Timestamp
  last_edited_by_table: TableName
  last_edited_by_id: UUID
}