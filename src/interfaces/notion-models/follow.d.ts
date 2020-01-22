import { Util } from "./"

export interface Follow {
  id: Util.UUID
  version: number
  /** "Follow This Page" switch. */
  following: boolean
  user_id: Util.UUID
  /** To follow a page, fill in id of the page block. */
  navigable_block_id: Util.UUID
  created_time: Util.TimestampNumber
}