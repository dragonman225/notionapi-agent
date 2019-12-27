import { UUID } from "../common/util"
import { ColumnID, ColumnPropertyType } from "../Collection"

export type SortDirection = "ascending" | "descending"

export interface Sort {
  id: UUID
  direction: SortDirection
  property: ColumnID
  type: ColumnPropertyType
}