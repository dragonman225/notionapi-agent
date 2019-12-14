export type CollectionViewType =
  "table" | "board" | "calendar" | "list" | "gallery"

/**
 * In {@link Aggregate}, {@link Filter}, and {@link Sort}, 
 * when `type` is "title", `property` is "title". 
 * 
 * Otherwise, `property` is a 4-ASCII-character string.
 */
export type PropertyKey = string

export type PropertyType =
  "title" | "text" | "number" | "select" | "multi_select" | "date"
  | "person" | "file" | "checkbox" | "url" | "email" | "phone_number"
  | "formula" | "created_time" | "created_by" | "last_edited_time"
  | "last_edited_by"