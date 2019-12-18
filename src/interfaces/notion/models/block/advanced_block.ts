import { UUID } from "../common"
import { EmptyBlock } from "./empty_block"
import { BlockFormat } from "./block_format"

export interface TableOfContent extends EmptyBlock {
  type: "table_of_contents"
  format?: BlockFormat
}

export interface Equation extends EmptyBlock {
  type: "equation"
  properties?: {
    /** LaTeX. */
    title?: [[string]]
  }
}

/**
 * Template button.
 */
export interface Factory extends EmptyBlock {
  type: "factory"
  /** Template content. */
  content?: UUID[]
  properties?: {
    /** Button name. */
    title?: [[string]]
  }
}

export interface Breadcrumb extends EmptyBlock {
  type: "breadcrumb"
}

export type AdvancedBlock =
  TableOfContent | Equation | Factory | Breadcrumb