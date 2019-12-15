import { UUID, Timestamp, ModelName } from "../common"

export type BlockType = "text" | "collection_view_page"

export interface AbstractBlock {
  id: UUID
  version: number
  type: BlockType
  created_by: UUID
  /** Appear in recently created blocks. */
  created_by_id?: UUID
  /** Appear in recently created blocks. */
  created_by_table?: ModelName
  created_time: Timestamp
  last_edited_by: UUID
  /** Appear in recently created blocks. */
  last_edited_by_id?: UUID
  /** Appear in recently created blocks. */
  last_edited_by_table?: ModelName
  last_edited_time: Timestamp
  parent_id: UUID
  parent_table: ModelName
  alive: boolean
}