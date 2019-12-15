/**
 * An UUID string, e.g. `0297b381-6319-417b-a4f8-2ca1f2a96a81`
 */
export type UUID = string

/**
 * Unix timestamp in milliseconds.
 */
export type Timestamp = number

/**
 * Notion's data model names.
 */
export type ModelName =
  "block" | "collection" | "collection_view"
  | "notion_user" | "user_root" | "user_settings"
  | "space" | "space_view"
  | "activity" | "follow" | "slack_integration"

/** 
 * Role of an entity (for now, only human user).
 */
export type EntityRole =
  "editor" | "reader" | "none"

/** 
 * Describe permission of an entity (for now, only human user).
 */
export interface Permission {
  /** I have seen only `user_permission`. */
  type: "user_permission" | string
  user_id: UUID
  /** The entity's role. */
  role: EntityRole
  allow_duplicate?: boolean
  allow_search_engine_indexing?: boolean
}