import { Util } from "../"
import { ColumnID, ColumnPropertyType } from "../collection"

export type SortDirection = "ascending" | "descending"

export interface Sort {
  id: Util.UUID
  direction: SortDirection
  property: ColumnID
  type: ColumnPropertyType
}