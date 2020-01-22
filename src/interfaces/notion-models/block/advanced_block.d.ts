import { EmptyBlock } from "./empty_block"

export interface TableOfContents extends EmptyBlock {
  type: "table_of_contents"
}

/**
 * Math Equation block.
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
 */
export interface Factory extends EmptyBlock {
  type: "factory"
  properties?: {
    /** Button name. */
    title?: [[string]]
  }
}

export interface Breadcrumb extends EmptyBlock {
  type: "breadcrumb"
}

export type AdvancedBlockUnion =
  TableOfContents | Equation | Factory | Breadcrumb