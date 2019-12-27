/**
 * An UUID string, e.g. `0297b381-6319-417b-a4f8-2ca1f2a96a81`
 * 
 * @category Common
 */
export type UUID = string

/**
 * Unix timestamp in milliseconds.
 * 
 * @category Common
 */
export type Timestamp = number

/**
 * TZ database name in "*Area/Location*" format, e.g. "Asia/Taipei".
 * 
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * 
 * @category Common
 */
export type TimeZone = string

/**
 * A decimal between and including 0 and 1.
 * 
 * @category Common
 */
export type Proportion = number

/**
 * A publicly accessible URL.
 * 
 * @category Common
 */
export type PublicUrl = string

/**
 * A path relative to `www.notion.so`, 
 * e.g. `/images/page-cover/gradients_10.jpg`.
 * 
 * @category Common
 */
export type NotionRelativePath = string

/**
 * An URL starting with 
 * `https://s3-us-west-2.amazonaws.com/secure.notion-static.com/`. 
 * Must be authenticated before access.
 * 
 * @category Common
 */
export type NotionSecureUrl = string

/**
 * A string containing exactly one emoji character.
 * 
 * @category Common
 */
export type Emoji = string

/**
 * Color names.
 * 
 * @category Common
 */
export type NotionColor =
  "gray" | "brown" | "orange" | "yellow" | "teal" | "blue" | "purple"
  | "pink" | "red" | "gray_background" | "brown_background"
  | "orange_background" | "yellow_background" | "teal_background"
  | "blue_background" | "purple_background" | "pink_background"
  | "red_background"

/**
 * Record table names.
 * 
 * @category Common
 */
export type Table =
  "block" | "collection" | "collection_view"
  | "notion_user" | "user_root" | "user_settings"
  | "space" | "space_view"
  | "activity" | "follow" | "slack_integration"
  | "comment" | "discussion"