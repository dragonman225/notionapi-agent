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
