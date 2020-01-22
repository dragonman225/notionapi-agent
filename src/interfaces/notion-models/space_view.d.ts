import { Util } from "./"

export interface SpaceView {
  id: Util.UUID
  version: number
  space_id: Util.UUID
  parent_id: Util.UUID
  parent_table: Util.Table
  alive: boolean
  notify_mobile: boolean
  notify_desktop: boolean
  notify_email: boolean
  /** Template page IDs. */
  visited_templates: Util.UUID[]
  /** Template page IDs. */
  sidebar_hidden_templates: Util.UUID[]
  created_getting_started: boolean
}