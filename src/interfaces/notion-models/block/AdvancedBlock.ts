import { EmptyBlock } from "./EmptyBlock"
import { BlockFormat } from "./BlockFormat"

/**
 * @category Notion Block
 */
export interface TableOfContent extends EmptyBlock {
  type: "table_of_contents"
  format?: BlockFormat
}

/**
 * Math Equation block.
 * 
 * @category Notion Block
 */
export interface Equation extends EmptyBlock {
  type: "equation"
  properties?: {
    /** LaTeX. */
    title?: [[string]]
  }
}

/**
 * Template button block.
 * 
 * @category Notion Block
 */
export interface Factory extends EmptyBlock {
  type: "factory"
  properties?: {
    /** Button name. */
    title?: [[string]]
  }
}

/**
 * @category Notion Block
 */
export interface Breadcrumb extends EmptyBlock {
  type: "breadcrumb"
}

/**
 * @category Notion Block
 */
export type AdvancedBlock =
  TableOfContent | Equation | Factory | Breadcrumb