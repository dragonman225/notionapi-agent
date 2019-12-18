import { UUID, TableName } from "../../models/common"
import { AnyRecord } from "./Record";

interface RecordRequest {
  id: UUID
  table: TableName
}

interface Request {
  requests: RecordRequest[]
}

interface Response {
  results: AnyRecord[]
}

/**
 * /api/v3/getRecordValues
 * 
 * Get records by table name and id.
 */
export interface GetRecordValues {
  /**
   * If a {@link RecordRequest} is the i<sup>th</sup> element 
   * of {@link Request.requests}, its result is the i<sup>th</sup> 
   * element of {@link Response.results}.
   */
  (request: Request): Promise<Response>
}