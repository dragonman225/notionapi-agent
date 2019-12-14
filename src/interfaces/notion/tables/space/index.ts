import { UUID, Timestamp, Table } from "../../common"

export type Role =
  "editor" | "reader" | "none"

export type Type = "user_permission"

export interface Permission {
  type: Type
  user_id: UUID
  /** The user's role. */
  role: Role
  allow_duplicate?: boolean
  allow_search_engine_indexing?: boolean
}

export interface Space {
  /** Space ID. */
  id: UUID
  version: number
  name: string
  permissions: Permission[]
  beta_enabled: boolean
  pages: UUID[]
  created_by: UUID
  created_time: Timestamp
  created_by_table: Table
  created_by_id: UUID
  last_edited_by: UUID
  last_edited_time: Timestamp
  last_edited_by_table: Table
  last_edited_by_id: UUID
}