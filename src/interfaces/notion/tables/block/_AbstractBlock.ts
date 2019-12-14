import { UUID, Timestamp, Table } from "../../common"

export type BlockType = "text" | "collection_view_page"

export interface AbstractBlock {
  id: UUID
  version: number
  type: BlockType
  created_by: UUID
  /** Appear in recently created blocks. */
  created_by_id?: UUID
  /** Appear in recently created blocks. */
  created_by_table?: Table
  created_time: Timestamp
  last_edited_by: UUID
  /** Appear in recently created blocks. */
  last_edited_by_id?: UUID
  /** Appear in recently created blocks. */
  last_edited_by_table?: Table
  last_edited_time: Timestamp
  parent_id: UUID
  parent_table: Table
  alive: boolean
}