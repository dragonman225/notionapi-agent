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

export interface Request {
  includeDeleted: boolean
}

export interface Response {
  pages: SharedPage[]
  recordMap: RecordMap
}

/**
 * /api/v3/getUserSharedPages.
 */
export interface GetUserSharedPages {
  (request: Request): Promise<Response>
}