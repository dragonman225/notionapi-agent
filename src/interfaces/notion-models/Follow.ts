import { UUID, Timestamp } from "./common/util"

export interface Follow {
  id: UUID
  version: number
  /** "Follow This Page" switch. */
  following: boolean
  user_id: UUID
  /** To follow a page, fill in id of the page block. */
  navigable_block_id: UUID
  created_time: Timestamp
}