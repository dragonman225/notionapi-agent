import { Util } from "../../"
import { Map } from "./Map"
import { BlockRecord, SpaceRecord } from "./Record"

export namespace GetUserSharedPages {

  interface SharedPage {
    id: Util.UUID
    spaceId: Util.UUID
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

}