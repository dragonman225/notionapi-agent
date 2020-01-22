import { Util } from "../"
import { EmptyBlock } from "./empty_block"

/**
 * Inline database block or Linked database block.
 */
export interface CollectionViewInline extends EmptyBlock {
  type: "collection_view"
  view_ids: Util.UUID[]
  collection_id: Util.UUID
}

/**
 * Full page database block.
 */
export interface CollectionViewPage extends EmptyBlock {
  type: "collection_view_page"
  view_ids: Util.UUID[]
  collection_id: Util.UUID
}

export type DatabaseBlockUnion = CollectionViewInline | CollectionViewPage