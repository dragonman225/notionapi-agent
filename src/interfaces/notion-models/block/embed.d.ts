import { Util, SemanticString } from "../"
import { EmptyBlock } from "./empty_block"

/**
 * General purpose embed block.
 */
export interface Embed extends EmptyBlock {
  type: "embed"
  properties?: {
    /**
     * This is a normal link.
     * 
     * Use `display_source` in {@link BlockFormat} for an iframe.
     */
    source?: [[Util.PublicUrl]]
    caption?: SemanticString[]
  }
}

/**
 * Codepen embed block.
 */
export interface Codepen extends EmptyBlock {
  type: "codepen"
  properties?: {
    /**
     * This is a normal link.
     * 
     * Use `display_source` in {@link BlockFormat} for an iframe.
     */
    source?: [[Util.PublicUrl]]
    caption?: SemanticString[]
  }
}

/**
 * Invision embed block.
 */
export interface Invision extends EmptyBlock {
  type: "invision"
  properties?: {
    source?: [[Util.PublicUrl]]
  }
}

/**
 * PDF embed block.
 */
export interface PDF extends EmptyBlock {
  type: "pdf"
  properties?: {
    source?: [[Util.NotionSecureUrl | Util.PublicUrl]]
  }
  /** Defined if the user uploaded a pdf. */
  file_ids?: Util.UUID[]
}

export type EmbedBlockUnion = Embed | Codepen | Invision | PDF