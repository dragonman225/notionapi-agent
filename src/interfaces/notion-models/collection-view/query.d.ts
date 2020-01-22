import { Aggregate, Aggregate2 } from "./aggregate"
import { Filter, Filter2, FilterOperator } from "./filter"
import { Sort } from "./sort"
import { Collection } from "../"

/**
 * Settings for the stable version of query engine.
 */
export interface Query {
  /** The "Count XXX" settings at the bottom of table UI. */
  aggregate: Aggregate[]
  /** The "Filter" button at the top right of table UI. */
  filter: Filter[]
  filter_operator: FilterOperator
  /** The "Sort" button at the top right of table UI. */
  sort: Sort[]
  /** Only appear in calendar view. */
  calendar_by?: Collection.ColumnID
}

/**
 * The new version of query settings.
 */
export interface Query2 {
  aggregate: Aggregate[]
  aggregations: Aggregate2[]
  filter: {
    filters: Filter2[]
    operator: FilterOperator
  }
  sort: Sort[]
}