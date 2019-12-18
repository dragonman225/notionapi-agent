import { UUID } from "../common"
import { EmptyBlock } from "./empty_block"

/**
 * Inline database, Linked database.
 */
export interface CollectionView extends EmptyBlock {
  type: "collection_view"
  view_ids: UUID[]
  collection_id: UUID
}

/**
 * Full page database.
 */
export interface CollectionViewPage extends EmptyBlock {
  type: "collection_view_page"
  view_ids: UUID[]
  collection_id: UUID
}

export type DatabaseBlock = CollectionView | CollectionViewPage