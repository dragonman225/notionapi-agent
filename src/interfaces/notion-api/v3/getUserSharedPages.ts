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
