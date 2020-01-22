import { UUID, Table } from "./common/util"
import { Query, Query2 } from "./collection-view/Query"
import { ColumnID } from "./Collection"

/** Types of database views Notion has. */
export type CollectionViewType =
  "table" | "board" | "calendar" | "list" | "gallery"

export interface TableProperty {
  width: number
  visible: boolean
  property: ColumnID
}

export interface GalleryProperty {
  visible: boolean
  property: ColumnID
}

export interface CollectionViewFormat {
  /** Layout settings for table columns. */
  table_properties?: TableProperty[]
  /** Whether to wrap content in a table cell. */
  table_wrap?: boolean
  gallery_properties?: GalleryProperty[]
  gallery_cover?: {
    /** TODO: Unfinished */
    type: "page_content"
  }
  gallery_cover_aspect?: string
  gallery_title_visible?: boolean
}

/**
 * Describe a view of a collection.
 */
export interface CollectionView {
  id: UUID
  version: number
  /** The type of view. */
  type: CollectionViewType
  /** The name of a view. */
  name: string
  /** 
   * Settings for aggregation, filtering, and sorting. It may not exist 
   * in newer collection views.
   */
  query?: Query
  /** 
   * The new version of `query`.
   */
  query2: Query2
  /**
   * Equivalent to these settings in Notion :
   * 1. Visibility switches in the **Properties** button dropdown.
   * 2. **Wrap Cells** switch in the **···** button dropdown.
   * 3. Table column width.
   */
  format: CollectionViewFormat
  parent_id: UUID
  parent_table: Table
  alive: boolean
  page_sort: UUID[]
}