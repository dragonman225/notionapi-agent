import { UUID, Timestamp, TableName } from "../common"

export type BlockType =
  "page" | "text" | "bulleted_list" | "numbered_list" | "to_do" | "toggle"
  | "header" | "sub_header" | "sub_sub_header" | "quote" | "callout"
  | "column_list" | "column"
  | "divider"
  | "collection_view" | "collection_view_page"
  | "image" | "video" | "audio" | "bookmark" | "code" | "file"
  | "embed" | "codepen" | "pdf"
  | "table_of_contents" | "equation" | "factory" | "breadcrumb"

/**
 * Describe properties every block have.
 */
export interface EmptyBlock {
  id: UUID
  version: number
  type: BlockType
  created_by: UUID
  /** Appear in recently created blocks. */
  created_by_id?: UUID
  /** Appear in recently created blocks. */
  created_by_table?: TableName
  created_time: Timestamp
  last_edited_by: UUID
  /** Appear in recently created blocks. */
  last_edited_by_id?: UUID
  /** Appear in recently created blocks. */
  last_edited_by_table?: TableName
  last_edited_time: Timestamp
  parent_id: UUID
  parent_table: TableName
  alive: boolean
  /** Copied from another block. */
  copied_from?: UUID
}
