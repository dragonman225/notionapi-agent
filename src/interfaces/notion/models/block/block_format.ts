import { IconString, CoverString, UUID, NotionColor } from "../common"

export interface PageFormat {
  page_icon?: IconString
  page_cover?: CoverString
  page_full_width?: boolean
  /** A decimal `0 <= n <= 1`. */
  page_cover_position?: number
  block_locked?: boolean
  /** User ID. */
  block_locked_by?: UUID
}

export interface GeneralBlockFormat {
  block_color?: NotionColor
}

export interface ColumnFormat {
  column_ratio?: number
}

export interface CalloutFormat {
  page_icon?: IconString
}