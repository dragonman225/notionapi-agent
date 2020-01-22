import { Util } from "../../"
import { Map } from "./Map"
import {
  BlockRecord, CollectionRecord, SpaceRecord, NotionUserRecord,
  ActivityRecord, FollowRecord, SlackIntegrationRecord
} from "./Record"

export namespace GetActivityLog {

  interface Request {
    spaceId: Util.UUID
    /** Id of a page block or ... ? */
    navigableBlockId: Util.UUID
    limit: number
  }
  
  interface Response {
    activityIds: Util.UUID[]
    recordMap: {
      block: Map<BlockRecord>
      space: Map<SpaceRecord>
      collection?: Map<CollectionRecord>
      notion_user: Map<NotionUserRecord>
      activity: Map<ActivityRecord>
      follow: Map<FollowRecord>
      slack_integration: Map<SlackIntegrationRecord>
    }
  }

}