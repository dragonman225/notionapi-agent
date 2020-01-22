import {
  Block, Collection, CollectionView,
  NotionUser, UserRoot, UserSettings,
  Space, SpaceView, Activity, Follow, SlackIntegration, Permission
} from "../../"

export type Record<T> = {
  role: Permission.Role
  /** Undefined if `role` is "none". */
  value?: T
}

export type RecordUnion =
  Block | Collection | CollectionView | NotionUser | UserRoot
  | UserSettings | Space | SpaceView | Activity | Follow
  | SlackIntegration

export type AnyRecord = Record<RecordUnion>
export type BlockRecord = Record<Block>
export type CollectionRecord = Record<Collection>
export type CollectionViewRecord = Record<CollectionView>
export type NotionUserRecord = Record<NotionUser>
export type UserRootRecord = Record<UserRoot>
export type UserSettingsRecord = Record<UserSettings>
export type SpaceRecord = Record<Space>
export type SpaceViewRecord = Record<SpaceView>
export type ActivityRecord = Record<Activity>
export type FollowRecord = Record<Follow>
export type SlackIntegrationRecord = Record<SlackIntegration>
