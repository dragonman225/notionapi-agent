import { UUID, TimeZone } from "../../notion-models/common/util"
import { Query } from "../../notion-models/collection-view/Query"
import { Map } from "./Map"
import {
  BlockRecord, CollectionRecord, CollectionViewRecord,
  SpaceRecord
} from "./Record"

interface AggregationResult {
  /** {@link Aggregate.id}. */
  id: UUID
  value: number
}

export interface QueryCollectionRequest {
  collectionId: UUID
  collectionViewId: UUID
  loader: {
    limit: number
    loadContentCover: boolean
    type: "table"
    /** `locale` in {@link UserSettings.settings} */
    userLocale: string
    userTimeZone: TimeZone
  }
  query: Query
}

export interface QueryCollectionResponse {
  result: {
    type: "table"
    blockIds: UUID[]
    aggregationResults: AggregationResult[]
    /** Number of blocks in this result.  */
    total: number
  }
  recordMap: {
    block: Map<BlockRecord>
    collection: Map<CollectionRecord>
    collection_view: Map<CollectionViewRecord>
    space: Map<SpaceRecord>
  }
}