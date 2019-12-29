import { UUID, Table } from "../../notion-models/common/util"
import { AnyRecord } from "./Record";

interface RecordRequest {
  id: UUID
  table: Table
}

export interface GetRecordValuesRequest {
  requests: RecordRequest[]
}

export interface GetRecordValuesResponse {
  results: AnyRecord[]
}