import { Util } from "../../"
import { EditAuthor } from "../../notion-models/activity"

export namespace GetSnapshotsList {

  /** TODO: Incomplete, may be incorrect. */
  interface Snapshot {
    id: Util.UUID
    version: number
    last_version: number
    parent_table: Util.Table
    parent_id: Util.UUID
    timestamp: Util.TimestampString
    inline_collection_block_ids: Util.UUID[] | null
    collection_ids: Util.UUID[] | null
    /** {@link NotionUser} ids. */
    author_ids: Util.UUID[]
    authors: EditAuthor[]
  }

  interface Request {
    blockId: Util.UUID
    size: number
  }

  interface Response {
    snapshots: Snapshot[]
  }

}