import { UUID, Timestamp, TimestampString, Table } from "./common/util"
import { Block } from "./Block"
import { CollectionSchema, ColumnProperty } from "./Collection"

export type EditType =
  "block-created" | "block-changed" | "collection-view-created"
  | "collection-view-changed" | "collection-property-deleted"

export interface EditAuthor {
  table: Table
  id: UUID
}

/**
 * If the edited block is a page in a collection, it has additional 
 * block_schema and collection_id property
 */
export interface AbstractEdit {
  type: EditType
  authors: EditAuthor[]
  navigable_block_id: UUID
  block_id?: UUID
  block_schema?: CollectionSchema
  collection_id?: UUID
  collection_property_id?: UUID
  collection_property_data?: Pick<ColumnProperty, "name" | "type">
  space_id: UUID
  user_ids: UUID[]
  timestamp: Timestamp
}

/**
 * A "block-created" edit
 */
export interface BlockCreatedEdit extends AbstractEdit {
  type: "block-created"
  block_data: {
    block_value: Block
  }
}

/**
 * A "block-changed" edit
 */
export interface BlockChangedEdit extends AbstractEdit {
  type: "block-changed"
  block_data: {
    after: { block_value: Block }
    before: { block_value: Block }
  }
}

export type ActivityType =
  "block-edited" | "collection-edited" | "collection-view-edited"
  | "collection-row-created" | "collection-property-edited"

export type Edit = BlockCreatedEdit | BlockChangedEdit

/**
 * TODO: Icomplete or may be incorrect.
 * 
 * If the activity is collection-related, it has additional 
 * collection_id property, also all its edits are collection-related.
 */
export interface Activity {
  id: UUID
  version: number
  index: number
  type: ActivityType
  parent_table: Table
  parent_id: UUID
  start_time: TimestampString
  end_time: TimestampString
  /** Usually false. */
  invalid: boolean
  /** Which types of "block" are navigable ? */
  navigable_block_id?: UUID
  collection_id?: UUID
  collection_row_id?: UUID
  collection_view_id?: UUID
  collection_property_id?: UUID
  space_id?: UUID
  edits: Edit[]
}