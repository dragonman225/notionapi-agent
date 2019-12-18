import { UUID, NotionSecureUrl, PublicUrl } from "../common"
import { EmptyBlock } from "./empty_block"
import { BlockFormat } from "./block_format"
import { SemanticString } from "../semantic_string"

export interface Embed extends EmptyBlock {
  type: "embed"
  format?: BlockFormat
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

export interface Codepen extends EmptyBlock {
  type: "codepen"
  format?: BlockFormat
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

export interface PDF extends EmptyBlock {
  type: "pdf"
  format?: BlockFormat
  properties?: {
    source?: [[NotionSecureUrl | PublicUrl]]
  }
  /** Defined if the user uploaded a pdf. */
  file_ids?: UUID[]
}

export type EmbedBlock = PDF | Codepen | PDF