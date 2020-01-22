import { Util, SemanticString, Permission } from "../"
import { EmptyBlock } from "./empty_block"
import { ColumnID } from "../collection"

/**
 * Embedded Sub-Page block or Link To Page block.
 */
export interface Page extends EmptyBlock {
  type: "page"
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
  file_ids?: Util.UUID[]
}

/**
 * Text block. Editable, can have children.
 */
export interface Text extends EmptyBlock {
  type: "text"
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Bulleted List block. Editable, can have children.
 */
export interface BulletedList extends EmptyBlock {
  type: "bulleted_list"
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Numbered List block. Editable, can have children.
 */
export interface NumberedList extends EmptyBlock {
  type: "numbered_list"
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * To Do block. Editable, can have children.
 */
export interface ToDo extends EmptyBlock {
  type: "to_do"
  properties?: {
    title?: SemanticString[]
    checked?: [["Yes" | "No"]]
  }
}

/**
 * Toggle block. Editable, can have children.
 */
export interface Toggle extends EmptyBlock {
  type: "toggle"
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Heading1 block. Editable, can't have children.
 */
export interface Header extends EmptyBlock {
  type: "header"
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Heading2 block. Editable, can't have children.
 */
export interface SubHeader extends EmptyBlock {
  type: "sub_header"
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Heading3 block. Editable, can't have children.
 */
export interface SubSubHeader extends EmptyBlock {
  type: "sub_sub_header"
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Quote block. Editable, can't have children.
 */
export interface Quote extends EmptyBlock {
  type: "quote"
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Callout block. Editable, can't have children.
 */
export interface Callout extends EmptyBlock {
  type: "callout"
  properties?: {
    title?: SemanticString[]
  }
  /** Defined if the user uploaded an image for icon. */
  file_ids?: Util.UUID[]
}

/**
 * Column List block. Not editable, can have children.
 * 
 * This is used to wrap blocks that should be displayed in the same row.
 * 
 * Children of this block must be {@link Column}.
 */
export interface ColumnList extends EmptyBlock {
  type: "column_list"
}

/**
 * Column block. Not editable, can have children.
 * 
 * Parent of this block must be {@link ColumnList}.
 */
export interface Column extends EmptyBlock {
  type: "column"
}

/**
 * Divider block. Not editable, can't have children.
 */
export interface Divider extends EmptyBlock {
  type: "divider"
}

export type BasicBlockUnion =
  Page | Text | BulletedList | NumberedList | ToDo | Toggle |
  Header | SubHeader | SubSubHeader | Quote | Callout |
  ColumnList | Column | Divider