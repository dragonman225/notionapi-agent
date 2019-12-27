import { UUID } from '../../notion-models/common/util'
import { Map } from './Map'
import { BlockRecord, SpaceRecord } from './Record'

interface SharedPage {
  id: UUID
  spaceId: UUID
}

export interface GetUserSharedPagesRequest {
  includeDeleted: boolean
}

export interface GetUserSharedPagesResponse {
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
 * 
 * @category Notion API
 */
export interface GetUserSharedPages {
  (request: GetUserSharedPagesRequest): Promise<GetUserSharedPagesResponse>
}
