import {
  Block, Collection, CollectionView,
  NotionUser, UserRoot, UserSettings,
  Space, SpaceView, Activity, Follow, SlackIntegration
} from "../../models"
import { PermissionRole } from "../../models/permission"

export type RecordValue =
  Block | Collection | CollectionView | NotionUser | UserRoot
  | UserSettings | Space | SpaceView | Activity | Follow
  | SlackIntegration

export interface Record {
  role: PermissionRole
  /** When `role` is "none", `value` does not exist. */
  value?: RecordValue
}

export interface BlockRecord extends Record {
  value: Block
}

export interface CollectionRecord extends Record {
  value: Collection
}

export interface CollectionViewRecord extends Record {
  value: CollectionView
}

export interface NotionUserRecord extends Record {
  value: NotionUser
}

export interface UserRootRecord extends Record {
  value: UserRoot
}

export interface UserSettingsRecord extends Record {
  value: UserSettings
}

export interface SpaceRecord extends Record {
  value: Space
}

export interface SpaceViewRecord extends Record {
  value: SpaceView
}

export interface ActivityRecord extends Record {
  value: Activity
}

export interface FollowRecord extends Record {
  value: Follow
}

export interface SlackIntegrationRecord extends Record {
  value: SlackIntegration
}