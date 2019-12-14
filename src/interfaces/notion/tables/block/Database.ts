import { UUID } from "../../common"
import { AbstractBlock } from "./_AbstractBlock"

export interface CollectionViewPage extends AbstractBlock {
  type: "collection_view_page"
  view_ids: UUID[]
  collection_id: UUID
}