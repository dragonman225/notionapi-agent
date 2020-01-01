import { UUID, Table } from "../../notion-models"
import { Map } from "./Map"
import {
  BlockRecord, CollectionRecord, CollectionViewRecord,
  NotionUserRecord, SpaceRecord
} from "./Record"

export interface CursorItem {
  table: Table
  id: UUID
  index: number
}

export interface Cursor {
  stack: CursorItem[][]
}

export interface LoadPageChunkRequest {
  pageId: UUID
  limit: number
  /**
   * Set `{ stack: [] }` for the first request, 
   * use {@link LoadPageChunkResponse.cursor} for the next request.
   */
  cursor: Cursor
  /** Set `0` for the first request, increase 1 for every future requests. */
  chunkNumber: number
  /** Set `false` to get more data ? */
  verticalColumns: boolean
}

export interface LoadPageChunkResponse {
  cursor: Cursor
  recordMap: {
    block: Map<BlockRecord>
    collection?: Map<CollectionRecord>
    collection_view?: Map<CollectionViewRecord>
    notion_user: Map<NotionUserRecord>
    space: Map<SpaceRecord>
  }
}