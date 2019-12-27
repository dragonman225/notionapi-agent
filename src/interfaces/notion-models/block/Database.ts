import { UUID } from "../common/util"
import { EmptyBlock } from "./EmptyBlock"

/**
 * Inline database block or Linked database block.
 * 
 * @category Notion Block
 */
export interface CollectionViewInline extends EmptyBlock {
  type: "collection_view"
  view_ids: UUID[]
  collection_id: UUID
}

/**
 * Full page database block.
 * 
 * @category Notion Block
 */
export interface CollectionViewPage extends EmptyBlock {
  type: "collection_view_page"
  view_ids: UUID[]
  collection_id: UUID
}

/**
 * @category Notion Block
 */
export type DatabaseBlock = CollectionViewInline | CollectionViewPage