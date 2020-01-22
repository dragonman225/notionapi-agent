import { Util, Collection } from "../"

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

export interface Filter {
  comparator: Comparator
  id: Util.UUID
  property: Collection.ColumnID
  type: Collection.ColumnPropertyType
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

/**
 * TODO: Look into the new `Filter2.filter.value.type`
 */
export interface Filter2 {
  filter: {
    value?: {
      type: "exact" | string
      value: boolean | number | string
    }
    operator: Comparator
  }
  property: Collection.ColumnID
}