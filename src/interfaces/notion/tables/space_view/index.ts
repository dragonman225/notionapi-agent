import { UUID, Table } from "../../common"

export interface SpaceView {
  id: UUID
  version: number
  space_id: UUID
  parent_id: UUID
  parent_table: Table
  alive: boolean
  notify_mobile: boolean
  notify_desktop: boolean
  notify_email: boolean
  /** Template page IDs. */
  visited_templates: UUID[]
  /** Template page IDs. */
  sidebar_hidden_templates: UUID[]
  created_getting_started: boolean
}