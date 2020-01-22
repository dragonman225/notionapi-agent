import { Util } from "../../"

export namespace SubmitTransaction {

  /**
   * TODO: Researching.
   * 
   * ## Examples
   * 
   * ### Add a new block
   * 
   * Create a block.
   * 
   * ```
   * {
   *   id: "<generate_one>",
   *   table: "block",
   *   path: [],
   *   command: "update",
   *   args: {
   *     id: "<the_same_as_above_one>",
   *     type: "<block_type>",
   *     properties: {},
   *     parent_id: "<parent_id>",
   *     parent_table: "block",
   *     alive: true,
   *     created_by: "<user_id>",
   *     created_time: <timestamp>,
   *     last_edited_by: "user_id",
   *     last_edited_time: <timestamp>
   *   }
   * }
   * ```
   * 
   * Place it somewhere.
   * 
   * ```
   * {
   *   id: "<parent_id>",
   *   table: "block",
   *   path: ["content"],
   *   command: "listAfter",
   *   args: {
   *     after: "<sibling_id>",
   *     id: "<new_block_id>"
   *   }
   * }
   * ```
   * 
   * ### Soft-Delete a block
   * 
   * First set the block to `{ alive: false }`.
   * 
   * ```
   * {
   *   id: "<block_id>",
   *   table: "block",
   *   path: [],
   *   command: "update",
   *   args: { alive: false }
   * }
   * ```
   * 
   * Then, remove it from its parent.
   * 
   * ```
   * {
   *   id: "<parent_block_id>",
   *   table: "block",
   *   path: ["content"],
   *   command: "listRemove",
   *   args: {
   *     id: "<block_id>"
   *   }
   * }
   * ```
   * 
   * Finally, Update its and its parent's `last_edited_time`.
   * 
   * ### Move a block
   * 
   * Soft-Delete a block → Update its parent and set `{ alive: true }` → 
   * Place it after another block → Update its and its parent's 
   * `last_edited_time`.
   */
  interface Operation {
    /** Use `id` + `table` to specify which record to operate on. */
    id: Util.UUID
    table: Util.Table
    /**
     * An object key path relative to the record. For example, to change 
     * the title of a {@link Page}, since the title is stored in 
     * "{@link Page}.properties.title", we need to specify 
     * `["properties", "title"]` here.
     */
    path: string[]
    /**
     * TODO: Incomplete
     * 
     * Guess: Use "set" with a `path` to set a property, and use "update" 
     * without `path` to set more than one properties, so are they 
     * interchangeable in general ?
     */
    command: "set" | "update" | "listAfter" | "listRemove"
    /**
     * The arguments of this operation. Type varies with operation.
     * 
     * Examples :
     * 
     * Set page title — {@link SemanticString}*[]*<br>
     * Set page icon — *string* : an URL or an emoji<br>
     * Set last edited time — *number*<br>
     * Remove value of a property by setting `args` to `null`.
     */
    args: any
  }

  interface Transaction {
    /** Just generate one by yourself. */
    id: Util.UUID
    operations: Operation[]
  }

  interface Request {
    /** Just generate one by yourself. */
    requestId: Util.UUID
    transactions: Transaction[]
  }

  /**
   * An empty object.
   */
  interface Response { }

}