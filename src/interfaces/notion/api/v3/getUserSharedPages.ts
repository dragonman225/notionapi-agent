import { UUID } from '../../models/common'
import { Map } from './util'
import { BlockRecord, SpaceRecord } from './common_structures/Record'

/**
 * A page shared by the user.
 */
export interface SharedPage {
  id: UUID
  spaceId: UUID
}

export type RecordMap = {
  block: Map<BlockRecord>
  space: Map<SpaceRecord>
}

/**
 * The request data of /api/v3/getUserSharedPages.
 */
export interface APIRequest {
  includeDeleted: boolean
}

/**
 * The response data of /api/v3/getUserSharedPages.
 */
export interface APIResponse {
  pages: SharedPage[]
  recordMap: RecordMap
}