import { UUID } from "../../models/common"
import { Query } from "../../models/collection_view/query"
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
    /** `time_zone` in {@link UserSettings.settings} */
    userTimeZone: string
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

/**
 * POST /api/v3/queryCollection
 * 
 * Query a collection by id, view id, 
 * and aggregate, filter, sort parameters.
 * 
 * @category Notion API
 */
export interface QueryCollection {
  /**
   * Set aggregate parameters with {@link Request.query}.
   * 
   * Set maximum number of records to get with {@link Request.loader}.
   */
  (request: QueryCollectionRequest): Promise<QueryCollectionResponse>
}