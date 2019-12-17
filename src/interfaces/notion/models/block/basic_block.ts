import { UUID } from "../common"
import { EmptyBlock } from "./empty_block"
import { ColumnID } from "../collection"
import { SemanticString } from "../semantic_string"
import {
  PageFormat, GeneralBlockFormat, ColumnFormat,
  CalloutFormat
} from "./block_format"
import { Permission } from "../permission"

/**
 * Page, Link To Page
 */
export interface Page extends EmptyBlock {
  type: "page"
  /** Children blocks' ID. */
  content?: UUID[]
  format?: PageFormat & GeneralBlockFormat
  properties?: {
    [key in ColumnID]: SemanticString[]
  }
  permissions?: Permission[]
  /** Files uploaded to this page. */
  file_ids?: UUID[]
}

/**
 * Editable, has children.
 */

export interface Text extends EmptyBlock {
  type: "text"
  content?: UUID[]
  format?: GeneralBlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface BulletedList extends EmptyBlock {
  type: "bulleted_list"
  content?: UUID[]
  format?: GeneralBlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface NumberedList extends EmptyBlock {
  type: "numbered_list"
  content?: UUID[]
  format?: GeneralBlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface ToDo extends EmptyBlock {
  type: "to_do"
  content?: UUID[]
  format?: GeneralBlockFormat
  properties?: {
    title?: SemanticString[]
    checked?: [["Yes" | "No"]]
  }
}

export interface Toggle extends EmptyBlock {
  type: "toggle"
  content?: UUID[]
  format?: GeneralBlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

/**
 * Editable, no children.
 */

export interface Header extends EmptyBlock {
  type: "header"
  format?: GeneralBlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface SubHeader extends EmptyBlock {
  type: "sub_header"
  format?: GeneralBlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface SubSubHeader extends EmptyBlock {
  type: "sub_sub_header"
  format?: GeneralBlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface Quote extends EmptyBlock {
  type: "quote"
  format?: GeneralBlockFormat
  properties?: {
    title?: SemanticString[]
  }
}

export interface Callout extends EmptyBlock {
  type: "callout"
  format?: CalloutFormat & GeneralBlockFormat
  properties?: {
    title?: SemanticString[]
  }
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
  format?: ColumnFormat
}

/**
 * Not editable, no children.
 */

export interface TableOfContent extends EmptyBlock {
  type: "table_of_contents"
  format?: GeneralBlockFormat
}

export interface Divider extends EmptyBlock {
  type: "divider"
}

export type BasicBlock =
  Page
  | Text | BulletedList | NumberedList | ToDo | Toggle
  | Header | SubHeader | SubSubHeader | Quote | Callout
  | ColumnList | Column
  | TableOfContent | Divider