import { Util, SemanticString } from "./"

/**
 * The "[comment]{@link Util.Table}" entity.
 * 
 * Example:
 * 
 * ```
 * {
 *   id: "<REDACTED>"
 *   version: 5
 *   alive: true
 *   space_id: "<REDACTED>"
 *   parent_id: "<REDACTED>"
 *   parent_table: "discussion"
 *   created_by_id: "<REDACTED>"
 *   created_by_table: "notion_user"
 *   created_time: 1618154520000
 *   last_edited_time: 1618154520000
 *   text: [["1234"]]
 * }
 * ```
 */
export interface Comment {
  id: Util.UUID
  version: number
  alive: boolean
  space_id: Util.UUID
  parent_id: Util.UUID
  /** One of {@link Util.Table}. Values I've seen: "discussion". */
  parent_table: Util.Table
  created_by_id: Util.UUID
  /** One of {@link Util.Table}. Values I've seen: "notion_user". */
  created_by_table: Util.Table
  created_time: Util.TimestampNumber
  last_edited_time: Util.TimestampNumber
  text: SemanticString[]
}