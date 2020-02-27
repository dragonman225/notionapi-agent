import { Util } from "../../"
import { Query2 } from "../../notion-models/collection-view/query"
import { Map } from "./Map"
import {
  BlockRecord, CollectionRecord, CollectionViewRecord,
  SpaceRecord
} from "./Record"

export namespace QueryCollection {

  interface AggregationResult {
    /** {@link Aggregate.id}. */
    id: Util.UUID
    value: number
  }

  interface Request {
    collectionId: Util.UUID
    collectionViewId: Util.UUID
    loader: {
      limit: number
      loadContentCover: boolean
      type: "table"
      /** `locale` in {@link UserSettings.settings} */
      userLocale: string
      userTimeZone: Util.TimeZone
    }
    query: Query2
  }

  interface Response {
    result: {
      type: "table"
      blockIds: Util.UUID[]
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

}