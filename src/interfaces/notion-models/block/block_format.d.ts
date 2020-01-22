import { Util } from "../"

/**
 * Everything about how to layout a block.
 */
export interface BlockFormat {
  block_locked?: boolean
  /** User ID. */
  block_locked_by?: Util.UUID
  block_color?: Util.NotionColor
  block_width?: number
  block_height?: number
  /** Full viewport width. */
  block_full_width?: boolean
  /** The same width as the parent page. */
  block_page_width?: boolean
  /** Height divided by width. */
  block_aspect_ratio?: number
  /** Whether to force isotropic [scaling](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale). */
  block_preserve_scale?: boolean
  /** Icon URL of the bookmarked web page. */
  bookmark_icon?: Util.PublicUrl
  /** Cover URL of the bookmarked web page. */
  bookmark_cover?: Util.PublicUrl
  column_ratio?: Util.Proportion
  code_wrap?: boolean
  display_source?: Util.NotionSecureUrl | Util.PublicUrl
  page_icon?: Util.Emoji | Util.NotionSecureUrl | Util.PublicUrl
  page_cover?: Util.NotionRelativePath | Util.NotionSecureUrl | Util.PublicUrl
  page_full_width?: boolean
  page_cover_position?: Util.Proportion
}
