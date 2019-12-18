import { UUID } from "../common"
import { EmptyBlock } from "./empty_block"
import { ColumnID } from "../collection"
import { SemanticString } from "../semantic_string"
import { BlockFormat } from "./block_format"
import { Permission } from "../permission"

/**
 * Page, Link To Page
 */
export interface Page extends EmptyBlock {
  type: "page"
  /** Children blocks' ID. */
  content?: UUID[]
  format?: BlockFormat
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
 * Editable, has children.
 */

export interface Text extends EmptyBlock {
  type: "text"
  content?: UUID[]
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface BulletedList extends EmptyBlock {
  type: "bulleted_list"
  content?: UUID[]
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface NumberedList extends EmptyBlock {
  type: "numbered_list"
  content?: UUID[]
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface ToDo extends EmptyBlock {
  type: "to_do"
  content?: UUID[]
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
    checked?: [["Yes" | "No"]]
  }
}

export interface Toggle extends EmptyBlock {
  type: "toggle"
  content?: UUID[]
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Editable, no children.
 */

export interface Header extends EmptyBlock {
  type: "header"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface SubHeader extends EmptyBlock {
  type: "sub_header"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface SubSubHeader extends EmptyBlock {
  type: "sub_sub_header"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface Quote extends EmptyBlock {
  type: "quote"
  format?: BlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

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
 * Not editable, has children.
 */

export interface ColumnList extends EmptyBlock {
  type: "column_list"
  /** Children must be {@link Column}. */
  content?: UUID[]
}

export interface Column extends EmptyBlock {
  type: "column"
  content?: UUID[]
  format?: BlockFormat
}

/**
 * Not editable, no children.
 */

export interface Divider extends EmptyBlock {
  type: "divider"
}

export type BasicBlock =
  Page
  | Text | BulletedList | NumberedList | ToDo | Toggle
  | Header | SubHeader | SubSubHeader | Quote | Callout
  | ColumnList | Column
  | Divider