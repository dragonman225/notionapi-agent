import { Util } from "./"
import { Query, Query2 } from "./collection-view/query"
import { Collection } from "./collection"

/**
 * Describe a view of a collection.
 */
export interface CollectionView {
  id: Util.UUID
  version: number
  /** The type of view. */
  type: CollectionView.Type
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
  format: CollectionView.Format
  parent_id: Util.UUID
  parent_table: Util.Table
  alive: boolean
  /**
   * Use queryCollection() with an empty query to get pages 
   * in a collection. `page_sort` does not include all pages.
   */
  page_sort: Util.UUID[]
}

export namespace CollectionView {

  /** Types of database views Notion has. */
  export type Type =
    "table" | "board" | "calendar" | "list" | "gallery"

  export interface Format {
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

  export interface TableProperty {
    width: number
    visible: boolean
    property: Collection.ColumnID
  }

  export interface GalleryProperty {
    visible: boolean
    property: Collection.ColumnID
  }

}