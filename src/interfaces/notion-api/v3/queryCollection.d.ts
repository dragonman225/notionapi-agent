import { Util } from "../../"
import { Aggregation } from "../../notion-models/collection-view/aggregate"
import { Filter2, FilterOperator } from "../../notion-models/collection-view/filter"
import { Sort } from "../../notion-models/collection-view/sort"
import { Map } from "./Map"
import {
  BlockRecord, CollectionRecord, CollectionViewRecord,
  SpaceRecord
} from "./Record"

export namespace QueryCollection {

  interface ResultsReducer {
    type: "results"
    limit: number
    loadContentCover: boolean
  }

  interface ResultsReducerResult {
    type: "results"
    blockIds: Util.UUID[]
    total: number
  }
  
  interface AggregationReducer {
    type: "aggregation"
    aggregation: Aggregation
  }
  
  interface AggregationReducerResult {
    type: "aggregation"
    aggregationResult: AggregationResult
  }

  type Reducer = ResultsReducer | AggregationReducer
  type ReducerResult = ResultsReducerResult | AggregationReducerResult

  interface Loader {
    filter?: {
      filters: Filter2[]
      operator: FilterOperator
    }
    sort?: Sort[]
    /**
     * A dictionary of reducers. Keys are customizable and are used to 
     * retrieve results in {@link Response.result}.
     */
    reducers: Record<string, Reducer>
    searchQuery: string
    type: "reducer"
    userTimeZone: Util.TimeZone
  }

  interface Request {
    collection: {
      id: Util.UUID
      spaceId?: Util.UUID
    }
    collectionView: {
      id: Util.UUID
      spaceId?: Util.UUID
    }
    loader: Loader
  }

  interface Response {
    result: {
      type: "reducer"
      reducerResults: Record<string, ReducerResult>
    }
    /** `__version__: 3` exists in the browser, but not in the requests made by notionapi-agent. */
    recordMap: {
      block: Map<Util.WithSpaceId<BlockRecord>>
      collection: Map<Util.WithSpaceId<CollectionRecord>>
      collection_view: Map<Util.WithSpaceId<CollectionViewRecord>>
      space: Map<Util.WithSpaceId<SpaceRecord>>
      __version__: 3
    } | {
      block: Map<BlockRecord>
      collection: Map<CollectionRecord>
      collection_view: Map<CollectionViewRecord>
      space: Map<SpaceRecord>
    }
  }

}