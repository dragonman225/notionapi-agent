/**
 * An UUID string, e.g. `0297b381-6319-417b-a4f8-2ca1f2a96a81`
 */
export type UUID = string

/**
 * Unix timestamp in milliseconds.
 */
export type Timestamp = number

/**
 * This string may be an emoji (Option: Emoji), 
 * Notion's "secure" AWS URL, which start with 
 * `https://s3-us-west-2.amazonaws.com/secure.notion-static.com/` 
 * (Option: Upload an Image), 
 * or public URL (Option: Link).
 */
export type IconString = string

/**
 * This string may be a relative path to root, 
 * e.g. `/images/page-cover/gradients_10.jpg` (Option: Gallery),
 * Notion's "secure" AWS URL, which start with 
 * `https://s3-us-west-2.amazonaws.com/secure.notion-static.com/` 
 * (Option: Upload), 
 * public URL (Option: Link, Unsplash).
 */
export type CoverString = string

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
