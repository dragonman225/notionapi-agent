import { UUID } from '../../models/common'
import { Map } from './Map'
import { BlockRecord, SpaceRecord } from './Record'

interface SharedPage {
  id: UUID
  spaceId: UUID
}

interface Request {
  includeDeleted: boolean
}

interface Response {
  pages: SharedPage[]
  recordMap: {
    block: Map<BlockRecord>
    space: Map<SpaceRecord>
  }
}

/**
 * /api/v3/getUserSharedPages.
 * 
 * Get ids of pages shared by the user.
 */
export interface GetUserSharedPages {
  (request: Request): Promise<Response>
}