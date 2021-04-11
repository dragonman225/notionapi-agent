import { Util, SemanticString } from "./"

/**
 * The "[discussion]{@link Util.Table}" entity.
 * 
 * Example:
 * 
 * ```
 * {
 *   id: "ce2ebab3-7fc5-459b-94dd-c052d233dde1"
 *   version: 1
 *   resolved: false
 *   space_id: "<REDACTED>"
 *   parent_id: "<REDACTED>"
 *   parent_table: "block"
 *   context: [["fewfwf", [["m", "ce2ebab3-7fc5-459b-94dd-c052d233dde1"]]]]
 *   comments: ["eca081fd-65b8-47d6-9a07-1cf7b97f664f"]
 * }
 * ```
 */
export interface Discussion {
  id: Util.UUID
  version: number
  resolved: boolean
  space_id: Util.UUID
  parent_id: Util.UUID
  /** One of {@link Util.Table}. Values I've seen: "block". */
  parent_table: Util.Table
  /**
   * The content of the **range** of text being discussed. NOT the content 
   * of the whole block.
   */
  context: SemanticString[]
  /** A list of ids of "comment" entities in the discussion. */
  comments: Util.UUID[]
}