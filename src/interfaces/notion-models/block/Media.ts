import { UUID, NotionSecureUrl, PublicUrl } from "../common/util"
import { EmptyBlock } from "./EmptyBlock"
import { SemanticString } from "../common/SemanticString"

/**
 * Image block.
 * 
 * @category Notion Block
 */
export interface Image extends EmptyBlock {
  type: "image"
  properties?: {
    /** 
     * Normally, the same as `display_source` in {@link BlockFormat}.
     * When they are different, use `display_source`.
     */
    source?: [[NotionSecureUrl | PublicUrl]]
    caption?: SemanticString[]
  }
  /**  Defined if the user uploaded an image. */
  file_ids?: UUID[]
}

/**
 * Video block.
 * 
 * @category Notion Block
 */
export interface Video extends EmptyBlock {
  type: "video"
  properties?: {
    /** 
     * Normally, the same as `display_source` in {@link BlockFormat}.
     * When they are different, use `display_source`.
     */
    source?: [[NotionSecureUrl | PublicUrl]]
    caption?: SemanticString[]
  }
  /**  Defined if the user uploaded a video. */
  file_ids?: UUID[]
}

/**
 * Audio block.
 * 
 * @category Notion Block
 */
export interface Audio extends EmptyBlock {
  type: "audio"
  properties?: {
    source: [[NotionSecureUrl | PublicUrl]]
  }
  /**  Defined if the user uploaded an audio file. */
  file_ids?: UUID[]
}

/**
 * Web Bookmark block.
 * 
 * @category Notion Block
 */
export interface Bookmark extends EmptyBlock {
  type: "bookmark"
  properties?: {
    /** Link of the bookmarked web page. */
    link: [[string]]
    /** Title of the bookmarked web page, auto detected. */
    title?: [[string]]
    /** Description of the bookmarked web page, auto detected. */
    description?: [[string]]
  }
}

/**
 * Code block.
 * 
 * @category Notion Block
 */
export interface Code extends EmptyBlock {
  type: "code"
  properties?: {
    /** Code content. */
    title?: [[string]]
    language?: [[string]]
  }
}

/**
 * File block.
 * 
 * @category Notion Block
 */
export interface File extends EmptyBlock {
  type: "file"
  properties?: {
    /** Filename. */
    title: [[string]]
    /** URL of the file. */
    source: [[NotionSecureUrl | PublicUrl]]
    /** File size, defined if the user uploaded a file. */
    size?: [[string]]
  }
  /**  Defined if the user uploaded a file. */
  file_ids?: UUID[]
}

/**
 * @category Notion Block
 */
export type MediaBlock = Image | Video | Audio | Bookmark | Code | File