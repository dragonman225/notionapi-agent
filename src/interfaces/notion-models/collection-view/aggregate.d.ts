import { Util, Collection } from "../"

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

export interface Aggregate {
  property: Collection.ColumnID
  type: Collection.ColumnPropertyType
  aggregation_type: AggregationType
  /**
   * When `aggregation_type` is "count", `id` is "count".
   * 
   * Otherwise, `id` is an Util.UUID string.
   */
  id: "count" | Util.UUID
  /** Aggregate is useless on other types of views. */
  view_type: "table" | "board"
}

/**
 * @remarks
 * Experimental. Do not use.
 */
export interface Aggregate2 {
  property: Collection.ColumnID
  aggregator: AggregationType
}