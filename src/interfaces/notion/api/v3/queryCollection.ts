import { UUID } from "../../common"
import { Query } from "../../tables/collection_view/query"
import { Map } from "./common_structures/Map"
import {
  BlockRecord, CollectionRecord, CollectionViewRecord,
  SpaceRecord
} from "./common_structures/Record"

export interface AggregationResult {
  /** {@link Aggregate.id} in request data. */
  id: UUID
  value: number
}

export interface Loader {
  limit: number
  loadContentCover: boolean
  type: "table"
  /** {@link UserSettings.settings.locale} */
  userLocale: string
  /** {@link UserSettings.settings.time_zone} */
  userTimeZone: string
}

export interface Result {
  type: "table"
  blockIds: UUID[]
  aggregationResults: AggregationResult[]
  /** Number of blocks in this result.  */
  total: number
}

export interface RecordMap {
  block: Map<BlockRecord>
  collection: Map<CollectionRecord>
  collection_view: Map<CollectionViewRecord>
  space: Map<SpaceRecord>
}

/**
 * The request data of /api/v3/queryCollection.
 */
export interface QueryCollectionRequest {
  collectionId: UUID
  collectionViewId: UUID
  loader: Loader
  query: Query
}

/**
 * The response data of /api/v3/queryCollection.
 */
export interface QueryCollectionResponse {
  result: Result
  recordMap: RecordMap
}