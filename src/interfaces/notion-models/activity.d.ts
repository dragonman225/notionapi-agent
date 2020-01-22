import { Util } from "./"
import { Block } from "./block"
import { CollectionSchema, ColumnProperty } from "./collection"

export type EditType =
  "block-created" | "block-changed" | "collection-view-created"
  | "collection-view-changed" | "collection-property-deleted"

export interface EditAuthor {
  /** Usually "notion_user". */
  table: Util.Table
  id: Util.UUID
}

/**
 * If the edited block is a page in a collection, it has additional 
 * block_schema and collection_id property
 */
export interface AbstractEdit {
  type: EditType
  authors: EditAuthor[]
  navigable_block_id: Util.UUID
  block_id?: Util.UUID
  block_schema?: CollectionSchema
  collection_id?: Util.UUID
  collection_property_id?: Util.UUID
  collection_property_data?: Pick<ColumnProperty, "name" | "type">
  space_id: Util.UUID
  user_ids: Util.UUID[]
  timestamp: Util.TimestampNumber
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
  id: Util.UUID
  version: number
  index: number
  type: ActivityType
  parent_table: Util.Table
  parent_id: Util.UUID
  start_time: Util.TimestampString
  end_time: Util.TimestampString
  /** Usually false. */
  invalid: boolean
  /** Which types of "block" are navigable ? */
  navigable_block_id?: Util.UUID
  collection_id?: Util.UUID
  collection_row_id?: Util.UUID
  collection_view_id?: Util.UUID
  collection_property_id?: Util.UUID
  space_id?: Util.UUID
  edits: Edit[]
}