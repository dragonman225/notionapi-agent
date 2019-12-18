import { Map } from "./Map"
import {
  BlockRecord,
  NotionUserRecord, UserRootRecord, UserSettingsRecord,
  SpaceRecord, SpaceViewRecord
} from "./Record"

/** It's empty. */
interface Request { }

interface Response {
  recordMap: {
    block: Map<BlockRecord>
    notion_user: Map<NotionUserRecord>
    user_root: Map<UserRootRecord>
    user_settings: Map<UserSettingsRecord>
    space: Map<SpaceRecord>
    space_view: Map<SpaceViewRecord>
  }
}

/**
 * POST /api/v3/loadUserContent
 * 
 * Get top level page blocks (`block` in {@link Response.recordMap}), 
 * user information, and workspace information.
 */
export interface LoadUserContent {
  (request: Request): Promise<Response>
}