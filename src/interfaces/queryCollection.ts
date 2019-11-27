export type PropertyType =
  "title" | "text" | "number" | "select" | "multi_select" | "date"
  | "person" | "file" | "checkbox" | "url" | "email" | "phone_number"
  | "formula" | "created_time" | "created_by" | "last_edited_time"
  | "last_edited_by"

/**
 * In {@link Aggregate}, {@link Filter}, and {@link Sort}, 
 * when `type` is "title", `property` is "title". 
 * 
 * Otherwise, `property` is a 4-ASCII-character string.
 */
export type PropertyKey = string

/** Fundamental aggregation types. */
export type CountAggregationType =
  "count" | "count_values" | "unique" | "empty" | "not_empty"
export type PercentAggregationType =
  "percent_empty" | "percent_not_empty"
export type CheckboxSpecificAggregationType =
  "checked" | "unchecked" | "percent_checked" | "percent_unchecked"
export type DateSpecificAggregationType =
  "earliest_date" | "latest_date" | "date_range"
export type NumberSpecificAggregationType =
  "sum" | "average" | "median" | "min" | "max" | "range"

/** Abstracted structure aggregation types. */
export type GeneralAggregationType =
  CountAggregationType | PercentAggregationType
export type TitleAggregationType = GeneralAggregationType
export type TextAggregationType = GeneralAggregationType
export type NumberAggregationType =
  GeneralAggregationType | NumberSpecificAggregationType
export type SelectAggregationType = GeneralAggregationType
export type MultiSelectAggregationType = GeneralAggregationType
export type DateAggregationType =
  GeneralAggregationType | DateSpecificAggregationType
export type PersonAggregationType = GeneralAggregationType
export type FileAggregationType = GeneralAggregationType
export type CheckboxAggregationType =
  "count" | CheckboxSpecificAggregationType
export type URLAggregationType = GeneralAggregationType
export type EmailAggregationType = GeneralAggregationType
export type PhoneAggregationType = GeneralAggregationType
export type CreatedEditedTimeAggregationType = DateAggregationType
export type CreatedEditedByAggregationType = GeneralAggregationType

/** AggregationType union. */
export type AggregationType =
  TitleAggregationType | TextAggregationType | NumberAggregationType
  | SelectAggregationType | MultiSelectAggregationType
  | DateAggregationType | PersonAggregationType | FileAggregationType
  | CheckboxAggregationType | URLAggregationType | EmailAggregationType
  | PhoneAggregationType | CreatedEditedTimeAggregationType
  | CreatedEditedByAggregationType

export type ViewType = "table"

/** Fundamental comparators. */
export type EmptinessComparator =
  "is_empty" | "is_not_empty"
export type StringComparator =
  "string_is" | "string_is_not" | "string_contains"
  | "string_does_not_contain" | "string_starts_with" | "string_ends_with"
export type EnumSingleComparator =
  "enum_is" | "enum_is_not"
export type EnumMultipleComparator =
  "enum_contains" | "enum_does_not_contain"
export type CheckboxSpecificComparator =
  "checkbox_is" | "checkbox_is_not"
export type DateSpecificComparator =
  "date_is" | "date_is_within" | "date_is_before" | "date_is_after"
  | "date_is_on_or_before" | "date_is_on_or_after"
export type NumberSpecificComparator =
  "number_equals" | "number_does_not_equal" | "number_greater_than"
  | "number_less_than" | "number_greater_than_or_equal_to"
  | "number_less_than_or_equal_to"

/** Abstracted structure comparators. */
export type TitleComparator =
  EmptinessComparator | StringComparator
export type TextComparator =
  EmptinessComparator | StringComparator
export type NumberComparator =
  EmptinessComparator | NumberSpecificComparator
export type SelectComparator =
  EmptinessComparator | EnumSingleComparator
export type MultiSelectComparator =
  EmptinessComparator | EnumMultipleComparator
export type DateComparator =
  EmptinessComparator | DateSpecificComparator
export type PersonComparator =
  EmptinessComparator | EnumMultipleComparator
export type FileComparator =
  EmptinessComparator
export type CheckboxComparator =
  CheckboxSpecificComparator
export type URLComparator =
  EmptinessComparator | StringComparator
export type EmailComparator =
  EmptinessComparator | StringComparator
export type PhoneComparator =
  EmptinessComparator | StringComparator
export type CreatedEditedTimeComparator =
  DateComparator
export type CreatedEditedByComparator =
  SelectComparator

/** Comparator union. */
export type Comparator =
  TitleComparator | TextComparator | NumberComparator
  | SelectComparator | MultiSelectComparator
  | DateComparator | PersonComparator | FileComparator | CheckboxComparator
  | URLComparator | EmailComparator | PhoneComparator
  | CreatedEditedTimeComparator | CreatedEditedByComparator

/** 
 * Valid FilterValueType when Comparator is "date_is", "date_is_before", 
 * "date_is_after", "date_is_on_or_before", "date_is_on_or_after".
 */
export type FilterValueTypeDateIsOnBeforeAfter =
  "exact_date" | "today" | "tomorrow"
  | "yesterday" | "one_week_ago" | "one_week_from_now"
  | "one_month_ago" | "one_month_from_now"

/** Valid FilterValueType when Comparator is "date_is_within". */
export type FilterValueTypeDateIsWithin =
  "the_past_week" | "the_past_month" | "the_past_year" | "the_next_week"
  | "the_next_month" | "the_next_year"

/** Valid FilterValueType when PropertyType is "person". */
export type FilterValueTypePerson = "person"

/**
 * In {@link Filter}, when `value` exists, this describes 
 * the `type` of `value`, otherwise, an instruction to get `value`.
 */
export type FilterValueType =
  FilterValueTypeDateIsOnBeforeAfter | FilterValueTypeDateIsWithin
  | FilterValueTypePerson

export type FilterOperator = "and" | "or"

export type SortDirection = "ascending" | "descending"

export interface Aggregate {
  property: PropertyKey
  type: PropertyType
  aggregation_type: AggregationType
  /**
   * When `aggregation_type` is "count", `id` is "count".
   * 
   * Otherwise, `id` is an UUID string.
   */
  id: string
  view_type: ViewType
}

export interface Filter {
  comparator: Comparator
  /** An UUID string. */
  id: string
  property: PropertyKey
  type: PropertyType
  /**
   * `value_type` exists when `type` is "date" or "person".
   */
  value_type?: FilterValueType
  /**
   * When `type` is "date", `value` exists only if `value_type` 
   * is "exact_date".
   * 
   * When `type` is "checkbox", `value` can only be "Yes" or "No".
   * 
   * When `type` is "person", `value` is the id of an user.
   * 
   * For all `type`, `value` may not exist if `comparator` is 
   * "is_empty" or "is_not_empty".
   */
  value?: string
}

export interface Sort {
  direction: SortDirection
  id: string
  property: PropertyKey
  type: PropertyType
}

export interface AggregationResult {
  /** {@link Aggregate.id} in request data. */
  id: string
  value: number
}

export interface Loader {
  limit: number
  loadContentCover: boolean
  /** Normally "table". */
  type: string
  /** Two-letter code, maybe ISO 639-1 ? */
  userLocale: string
  /** tz database name "*Area/Location*", e.g. "Asia/Taipei". */
  userTimeZone: string
}

export interface Query {
  aggregate: Aggregate[]
  filter: Filter[]
  filter_operator: FilterOperator
  sort: Sort[]
}

export interface Result {
  /** Normally "table". */
  type: string
  /** Ids of blocks in this result. */
  blockIds: string[]
  aggregationResults: AggregationResult[]
  /** Number of total items in this result.  */
  total: number
}

/** TODO */
export interface RecordMap {

}

/**
 * The request data of /api/v3/queryCollection.
 */
export interface QueryCollectionReq {
  collectionId: string
  collectionViewId: string
  loader: Loader
  query: Query
}

/**
 * The response data of /api/v3/queryCollection.
 */
export interface QueryCollectionRes {
  result: Result
  recordMap: RecordMap
}