import { Map } from "./Map"
import {
  BlockRecord,
  NotionUserRecord, UserRootRecord, UserSettingsRecord,
  SpaceRecord, SpaceViewRecord
} from "./Record"

export namespace LoadUserContent {

  /** An empty object. */
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

}