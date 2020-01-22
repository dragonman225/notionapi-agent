import { Util } from "../../"
import { AnyRecord } from "./Record"

export namespace GetRecordValues {

  interface RecordRequest {
    id: Util.UUID
    table: Util.Table
  }

  interface Request {
    requests: RecordRequest[]
  }

  interface Response {
    results: AnyRecord[]
  }

}