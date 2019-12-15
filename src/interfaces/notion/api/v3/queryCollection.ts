import { UUID } from "../../models/common"
import { Query } from "../../models/collection_view/query"
import { Map } from "./util"
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

export interface Request {
  collectionId: UUID
  collectionViewId: UUID
  loader: Loader
  query: Query
}

export interface Response {
  result: Result
  recordMap: RecordMap
}

/**
 * /api/v3/queryCollection
 */
export interface QueryCollection {
  (request: Request): Promise<Response>
}