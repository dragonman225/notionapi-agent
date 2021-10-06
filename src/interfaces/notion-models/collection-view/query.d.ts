import { Aggregation } from "./aggregate"
import { Filter2, FilterOperator } from "./filter"
import { Sort } from "./sort"
import { CollectionView } from "../collection_view"
import { Util } from "../util"

/**
 * Query settings on {@link CollectionView}.
 */
export interface Query2 {
  aggregations: Aggregation[]
  filter: {
    filters: Filter2[]
    operator: FilterOperator
  }
  sort: Sort[]
  spaceId: Util.UUID
  type: CollectionView.Type
  version: number
}