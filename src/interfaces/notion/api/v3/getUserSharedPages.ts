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
 * POST /api/v3/getUserSharedPages.
 * 
 * Get ids of pages created with **+ New Page** button at the top level of 
 * the user's workspace *AND* created not at the top level but had been 
 * moved to the top level some time after created.
 * 
 * To always get the top level pages of the user's workspace, 
 * use {@link LoadUserContent}.
 */
export interface GetUserSharedPages {
  (request: Request): Promise<Response>
}
