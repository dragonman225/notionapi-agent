import { UUID, Table, TimestampString } from "../../notion-models"
import { EditAuthor } from "../../notion-models/Activity"

/** TODO: Incomplete, may be incorrect. */
export interface Snapshot {
  id: UUID
  version: number
  last_version: number
  parent_table: Table
  parent_id: UUID
  timestamp: TimestampString
  inline_collection_block_ids: UUID[] | null
  collection_ids: UUID[] | null
  /** {@link NotionUser} ids. */
  author_ids: UUID[]
  authors: EditAuthor[]
}

export interface GetSnapshotsListRequest {
  blockId: UUID
  size: number
}

export interface GetSnapshotsListResponse {
  snapshots: Snapshot[]
}