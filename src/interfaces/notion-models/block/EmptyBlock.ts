import { UUID, Timestamp, Table } from "../common/util"

/**
 * All block names.
 * 
 * @category Notion Block
 */
export type BlockType =
  "page" | "text" | "bulleted_list" | "numbered_list" | "to_do" | "toggle"
  | "header" | "sub_header" | "sub_sub_header" | "quote" | "callout"
  | "column_list" | "column"
  | "divider"
  | "collection_view" | "collection_view_page"
  | "image" | "video" | "audio" | "bookmark" | "code" | "file"
  | "embed" | "codepen" | "invision" | "pdf"
  | "table_of_contents" | "equation" | "factory" | "breadcrumb"

/**
 * An abstract block, used to hold common properties of all blocks.
 * 
 * Doesn't actually exist in Notion.
 * 
 * @category Notion Block
 */
export interface EmptyBlock {
  id: UUID
  version: number
  type: BlockType
  /** Ids of children blocks */
  content?: UUID[]
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
  /** Copied from another block. */
  copied_from?: UUID
}
