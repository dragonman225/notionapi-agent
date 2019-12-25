/**
 * An UUID string, e.g. `0297b381-6319-417b-a4f8-2ca1f2a96a81`
 */
export type UUID = string

/**
 * Unix timestamp in milliseconds.
 */
export type Timestamp = number

/**
 * tz database name "*Area/Location*", e.g. "Asia/Taipei".
 */
export type TimeZone = string

/** A number `0 <= n <= 1`. */
export type Proportion = number

/**
 * A publicly accessible URL.
 */
export type PublicUrl = string

/**
 * A path relative to `www.notion.so`, 
 * e.g. `/images/page-cover/gradients_10.jpg`.
 */
export type NotionRelativePath = string

/**
 * An URL starting with 
 * `https://s3-us-west-2.amazonaws.com/secure.notion-static.com/`. 
 * Must be authenticated before access.
 */
export type NotionSecureUrl = string

/**
 * A string containing exactly one emoji character.
 */
export type Emoji = string

export type NotionColor =
  "gray" | "brown" | "orange" | "yellow" | "teal" | "blue" | "purple"
  | "pink" | "red" | "gray_background" | "brown_background"
  | "orange_background" | "yellow_background" | "teal_background"
  | "blue_background" | "purple_background" | "pink_background"
  | "red_background"

/**
 * Notion's database table names.
 */
export type TableName =
  "block" | "collection" | "collection_view"
  | "notion_user" | "user_root" | "user_settings"
  | "space" | "space_view"
  | "activity" | "follow" | "slack_integration"
