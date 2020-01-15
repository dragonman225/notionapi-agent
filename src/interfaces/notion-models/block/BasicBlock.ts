import { UUID } from "../common/util"
import { EmptyBlock } from "./EmptyBlock"
import { ColumnID } from "../Collection"
import { SemanticString } from "../common/SemanticString"
import { BlockFormat } from "./BlockFormat"
import { Permission } from "../common/Permission"

/**
 * Embedded Sub-Page block or Link To Page block.
 * 
 * @category Notion Block
 */
export interface Page extends EmptyBlock {
  type: "page"
  format?: BlockFormat
  /**
   * In a database, every record is a page. Properties set in a database 
   * are stored here.
   * Content of all types of property can be expressed as 
   * a {@link SemanticString} array. Some interesting types are listed below:
   * 
   * Relation — They use {@link InlineMentionPage} to represent related  
   * pages, so for example, if a page is related to another 3 pages, 
   * it looks like 
   * 
   * ```
   * [InlineMentionPage, [","], InlineMentionPage, [","], InlineMentionPage]
   * ```
   */
  properties?: {
    [key in ColumnID]: SemanticString[]
  }
  permissions?: Permission[]
  /** 
   * Defined if the user upload images for page icon and page cover.
   */
  file_ids?: UUID[]
}

/**
 * Text block. Editable, can have children.
 * 
 * @category Notion Block
 */
export interface Text extends EmptyBlock {
  type: "text"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Bulleted List block. Editable, can have children.
 * 
 * @category Notion Block
 */
export interface BulletedList extends EmptyBlock {
  type: "bulleted_list"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Numbered List block. Editable, can have children.
 * 
 * @category Notion Block
 */
export interface NumberedList extends EmptyBlock {
  type: "numbered_list"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * To Do block. Editable, can have children.
 * 
 * @category Notion Block
 */
export interface ToDo extends EmptyBlock {
  type: "to_do"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
    checked?: [["Yes" | "No"]]
  }
}

/**
 * Toggle block. Editable, can have children.
 * 
 * @category Notion Block
 */
export interface Toggle extends EmptyBlock {
  type: "toggle"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Heading1 block. Editable, can't have children.
 * 
 * @category Notion Block
 */
export interface Header extends EmptyBlock {
  type: "header"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Heading2 block. Editable, can't have children.
 * 
 * @category Notion Block
 */
export interface SubHeader extends EmptyBlock {
  type: "sub_header"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Heading3 block. Editable, can't have children.
 * 
 * @category Notion Block
 */
export interface SubSubHeader extends EmptyBlock {
  type: "sub_sub_header"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Quote block. Editable, can't have children.
 * 
 * @category Notion Block
 */
export interface Quote extends EmptyBlock {
  type: "quote"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Callout block. Editable, can't have children.
 * 
 * @category Notion Block
 */
export interface Callout extends EmptyBlock {
  type: "callout"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
  /** Defined if the user uploaded an image for icon. */
  file_ids?: UUID[]
}

/**
 * Column List block. Not editable, can have children.
 * 
 * This is used to wrap blocks that should be displayed in the same row.
 * 
 * Children of this block must be {@link Column}.
 * 
 * @category Notion Block
 */
export interface ColumnList extends EmptyBlock {
  type: "column_list"
  format?: BlockFormat
}

/**
 * Column block. Not editable, can have children.
 * 
 * Parent of this block must be {@link ColumnList}.
 * 
 * @category Notion Block
 */
export interface Column extends EmptyBlock {
  type: "column"
  format?: BlockFormat
}

/**
 * Divider block. Not editable, can't have children.
 * 
 * @category Notion Block
 */
export interface Divider extends EmptyBlock {
  type: "divider"
}

/**
 * @category Notion Block
 */
export type BasicBlock =
  Page
  | Text | BulletedList | NumberedList | ToDo | Toggle
  | Header | SubHeader | SubSubHeader | Quote | Callout
  | ColumnList | Column
  | Divider