import { Util, Collection } from "../"

export type SortDirection = "ascending" | "descending"

export interface Sort {
  id: Util.UUID
  direction: SortDirection
  property: Collection.ColumnID
  type: Collection.ColumnPropertyType
}