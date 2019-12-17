import { UUID, TableName } from "../common"
import { Query, Query2 } from "./query"
import { CollectionViewFormat } from "./format"

/** Types of database views Notion has. */
export type CollectionViewType =
  "table" | "board" | "calendar" | "list" | "gallery"

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
  /** Settings for aggregation, filtering, and sorting. */
  query: Query
  query2: Query2
  /**
   * Equivalent to these settings in Notion :
   * 1. Visibility switches in the **Properties** button dropdown.
   * 2. **Wrap Cells** switch in the **···** button dropdown.
   * 3. Table column width.
   */
  format: CollectionViewFormat
  parent_id: UUID
  parent_table: TableName
  alive: boolean
  page_sort: UUID[]
}