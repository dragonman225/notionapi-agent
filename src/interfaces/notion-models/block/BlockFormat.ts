import {
  UUID, NotionColor, Emoji, NotionSecureUrl, PublicUrl,
  NotionRelativePath, Proportion
} from "../common/util"

/**
 * Everything about how to layout a block.
 * 
 * @category Notion Block
 */
export interface BlockFormat {
  block_locked?: boolean
  /** User ID. */
  block_locked_by?: UUID
  block_color?: NotionColor
  block_width?: number
  block_height?: number
  block_full_width?: boolean
  block_page_width?: boolean
  block_aspect_ratio?: Proportion
  block_preserve_scale?: boolean
  /** Icon URL of the bookmarked web page. */
  bookmark_icon?: PublicUrl
  /** Cover URL of the bookmarked web page. */
  bookmark_cover?: PublicUrl
  column_ratio?: Proportion
  code_wrap?: boolean
  display_source?: NotionSecureUrl | PublicUrl
  page_icon?: Emoji | NotionSecureUrl | PublicUrl
  page_cover?: NotionRelativePath | NotionSecureUrl | PublicUrl
  page_full_width?: boolean
  page_cover_position?: Proportion
}
