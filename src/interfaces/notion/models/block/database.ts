import { UUID } from "../common"
import { EmptyBlock } from "./empty_block"

export interface CollectionViewPage extends EmptyBlock {
  type: "collection_view_page"
  view_ids: UUID[]
  collection_id: UUID
}