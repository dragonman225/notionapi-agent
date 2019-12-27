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

/**
 * POST /api/v3/getRecordValues
 * 
 * Get records by table name and id.
 * 
 * @category Notion API
 */
export interface GetRecordValues {
  /**
   * If a {@link RecordRequest} is the i<sup>th</sup> element 
   * of {@link GetRecordValuesRequest.requests}, its result is 
   * the i<sup>th</sup> element of {@link GetRecordValuesResponse.results}.
   */
  (request: GetRecordValuesRequest): Promise<GetRecordValuesResponse>
}