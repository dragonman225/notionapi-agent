import { GetActivityLog } from "./v3/getActivityLog"
import { GetAssetsJson } from "./v3/getAssetsJson"
import { GetRecordValues } from "./v3/getRecordValues"
import { GetSnapshotsList } from "./v3/getSnapshotsList"
import { GetUserSharedPages } from "./v3/getUserSharedPages"
import { LoadPageChunk } from "./v3/loadPageChunk"
import { LoadUserContent } from "./v3/loadUserContent"
import { QueryCollection } from "./v3/queryCollection"
import { SubmitTransaction } from "./v3/submitTransaction"

export namespace API {

  export {
    GetActivityLog, GetAssetsJson, GetRecordValues, GetSnapshotsList,
    GetUserSharedPages, LoadPageChunk, LoadUserContent, QueryCollection,
    SubmitTransaction
  }

  export { ErrorResponse } from "./v3/ErrorResponse"

}