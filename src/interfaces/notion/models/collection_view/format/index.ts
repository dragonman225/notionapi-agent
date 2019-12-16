import { ColumnID } from "../../collection"

export interface TableProperty {
  width: number
  visible: boolean
  property: ColumnID
}

export interface GalleryProperty {
  visible: boolean
  property: ColumnID
}

export interface Format {
  /** Layout settings for table columns. */
  table_properties?: TableProperty[]
  /** Whether to wrap content in a table cell. */
  table_wrap?: boolean
  gallery_properties?: GalleryProperty[]
  gallery_cover?: { 
    /** TODO: Unfinished */
    type: "page_content" 
  }
  gallery_cover_aspect?: string
  gallery_title_visible?: boolean
}