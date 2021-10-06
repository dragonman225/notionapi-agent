import { Collection } from "../"

export type SortDirection = "ascending" | "descending"

export interface Sort {
  direction: SortDirection
  property: Collection.ColumnID
}