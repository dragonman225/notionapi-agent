import { UUID } from "../../common"
import { ColumnID, ColumnPropertyType } from "../../collection"

export type SortDirection = "ascending" | "descending"

export interface Sort {
  id: UUID
  direction: SortDirection
  property: ColumnID
  type: ColumnPropertyType
}