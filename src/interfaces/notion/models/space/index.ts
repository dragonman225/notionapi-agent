import { UUID, Timestamp, ModelName } from "../common"
import { SpacePermission } from "../Permission"

/**
 * Describe a workspace, which can be thought of as a special case of 
 * a `page` block.
 */
export interface Space {
  id: UUID
  version: number
  name: string
  permissions: SpacePermission[]
  beta_enabled: boolean
  pages: UUID[]
  created_by: UUID
  created_time: Timestamp
  created_by_table: ModelName
  created_by_id: UUID
  last_edited_by: UUID
  last_edited_time: Timestamp
  last_edited_by_table: ModelName
  last_edited_by_id: UUID
}