import { UUID } from "../common"
import { SemanticString } from "../SemanticString"
import { GalleryProperty } from "../collection_view/format"

/**
 * Also used in {@link TableProperty}, {@link GalleryProperty}, 
 * {@link Aggregate}, {@link Filter}, {@link Query}, and {@link Sort}.
 * 
 * `title` when {@link ColumnPropertyType} is `title`.
 * 
 * Otherwise, a 4-ASCII-character string. e.g. `%7_Z`.
 */
export type ColumnID = string

export type ColumnPropertyType =
  "title" | "text" | "number" | "select" | "multi_select" | "date"
  | "person" | "file" | "checkbox" | "url" | "email" | "phone_number"
  | "formula" | "created_time" | "created_by" | "last_edited_time"
  | "last_edited_by"

export interface Format {
  collection_cover_position?: number
  /** TODO: Not sure if {@link TableProperty} is also possible. */
  collection_page_properties?: GalleryProperty[]
}

export type ColumnPropertyOptionColor =
  "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue"
  | "purple" | "pink" | "red"

export interface ColumnPropertyOption {
  id: UUID
  color: ColumnPropertyOptionColor
  value: string
}

export interface ColumnProperty {
  name: string
  options?: ColumnPropertyOption[]
  type: ColumnPropertyType
}

export interface Collection {
  id: UUID
  /** `name[0][0]` is the collection's name. */
  name: {
    0: { 0: string }
  }
  /**
   * String with a emoji character (Emoji), 
   * Notion's "secure" URL (Upload an Image), 
   * or public URL (Link).
   */
  icon?: string
  /**
   * Notion's "secure" URL (Gallery, Upload),
   * or public URL (Link, Unsplash).
   */
  cover?: string
  description?: SemanticString[]
  format?: Format
  parent_id: string
  parent_table: string
  schema: {
    [key in ColumnID]: ColumnProperty
  }
  version: number
  alive: boolean
}