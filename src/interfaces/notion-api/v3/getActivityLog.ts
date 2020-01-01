import { UUID } from "../../notion-models"
import { Map } from './Map'
import {
  BlockRecord, CollectionRecord, SpaceRecord, NotionUserRecord,
  ActivityRecord, FollowRecord, SlackIntegrationRecord
} from './Record'

export interface GetActivityLogRequest {
  spaceId: UUID
  /** Id of a page block or ... ? */
  navigableBlockId: UUID
  limit: number
}

export interface GetActivityLogResponse {
  activityIds: UUID[]
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