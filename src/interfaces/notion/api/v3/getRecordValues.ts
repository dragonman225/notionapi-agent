import { UUID, TableName } from "../../models/common"
import { AnyRecord } from "./Record";

interface RecordRequest {
  id: UUID
  table: TableName
}

export interface GetRecordValuesRequest {
  requests: RecordRequest[]
}

export interface GetRecordValuesResponse {
  results: AnyRecord[]
}

/**
 * POST /api/v3/getRecordValues
 * 
 * Get records by table name and id.
 */
export interface GetRecordValues {
  /**
   * If a {@link RecordRequest} is the i<sup>th</sup> element 
   * of {@link Request.requests}, its result is the i<sup>th</sup> 
   * element of {@link Response.results}.
   */
  (request: GetRecordValuesRequest): Promise<GetRecordValuesResponse>
}