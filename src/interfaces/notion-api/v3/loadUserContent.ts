import { Map } from "./Map"
import {
  BlockRecord,
  NotionUserRecord, UserRootRecord, UserSettingsRecord,
  SpaceRecord, SpaceViewRecord
} from "./Record"

export interface LoadUserContentResponse {
  recordMap: {
    block: Map<BlockRecord>
    notion_user: Map<NotionUserRecord>
    user_root: Map<UserRootRecord>
    user_settings: Map<UserSettingsRecord>
    space: Map<SpaceRecord>
    space_view: Map<SpaceViewRecord>
  }
}