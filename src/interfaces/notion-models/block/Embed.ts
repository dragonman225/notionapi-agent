import { UUID, NotionSecureUrl, PublicUrl } from "../common/util"
import { EmptyBlock } from "./EmptyBlock"
import { SemanticString } from "../common/SemanticString"

/**
 * General purpose embed block.
 * 
 * @category Notion Block
 */
export interface Embed extends EmptyBlock {
  type: "embed"
  properties?: {
    /**
     * This is a normal link.
     * 
     * Use `display_source` in {@link BlockFormat} for an iframe.
     */
    source?: [[PublicUrl]]
    caption?: SemanticString[]
  }
}

/**
 * Codepen embed block.
 * 
 * @category Notion Block
 */
export interface Codepen extends EmptyBlock {
  type: "codepen"
  properties?: {
    /**
     * This is a normal link.
     * 
     * Use `display_source` in {@link BlockFormat} for an iframe.
     */
    source?: [[PublicUrl]]
    caption?: SemanticString[]
  }
}

/**
 * Invision embed block.
 * 
 * @category Notion Block
 */
export interface Invision extends EmptyBlock {
  type: "invision"
  properties?: {
    source?: [[PublicUrl]]
  }
}

/**
 * PDF embed block.
 * 
 * @category Notion Block
 */
export interface PDF extends EmptyBlock {
  type: "pdf"
  properties?: {
    source?: [[NotionSecureUrl | PublicUrl]]
  }
  /** Defined if the user uploaded a pdf. */
  file_ids?: UUID[]
}

/**
 * @category Notion Block
 */
export type EmbedBlock = Embed | Codepen | Invision | PDF