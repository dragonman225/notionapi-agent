import { EmptyBlock } from "./empty_block"
import { Util } from "../util"

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

/**
 * Synced block that is marked "Original".
 * 
 * Indicating that its children blocks (property "content") can be transcluded.
 */
export interface TransclusionContainer extends EmptyBlock {
  type: "transclusion_container"
}

/**
 * Synced block that is not marked "Original". (which means it's a reference)
 */
export interface TransclusionReference extends EmptyBlock {
  type: "transclusion_reference"
  format: {
    /** In which block you click "Copy and sync" before pasting this block. */
    copied_from_pointer: Util.Pointer
    /** The {@link TransclusionContainer} to transclude content. */
    transclusion_reference_pointer: Util.Pointer
  }
}

export type AdvancedBlockUnion =
  TableOfContents | Equation | Factory | Breadcrumb | TransclusionContainer