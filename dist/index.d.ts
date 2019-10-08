/**
 * Options of NotionAgent constructor
 * @typedef AgentOptions
 * @property {string} token - Login token (`token_v2` field in cookie)
 * @property {string} timezone - User's timezone
 * @property {string} locale - User's locale
 * @property {boolean} suppressWarning - Whether to hide warnings
 * @property {boolean} verbose - Whether to show status messages
 */
declare type AgentOptions = {
    token?: string;
    timezone?: string;
    locale?: string;
    suppressWarning?: boolean;
    verbose?: boolean;
};
/**
 * A request object in getRecordValues' `requests` array
 * @typedef RecordRequest
 * @property {string} id - ID of a item
 * @property {string} table - The table to query
 */
declare type RecordRequest = {
    id: string;
    table: string;
};
/**
 * An aggregate query
 * @typedef AggregateQuery
 * @property {string} id
 * @property {string} type
 * @property {string} property
 * @property {string} view_type
 * @property {string} aggregation_type
 */
declare type AggregateQuery = {
    id: string;
    type: string;
    property: string;
    view_type: string;
    aggregation_type: string;
};
/**
 * An operation on Notion.so document
 * @typedef DocumentOperation
 * @property {string} id - The ID of the block where the operation apply
 * @property {string} table - Usually "block"
 * @property {string[]} path - Property path relative to the block itself
 * @property {string} command - The operation type. e.g. "set", "update"
 * @property {any[]} args - The arguments of the command
 */
declare type DocumentOperation = {
    id: string;
    table: string;
    path: string[];
    command: string;
    args: any[];
};
/**
 * Error response from Notion.so
 * @typedef NotionError
 * @property {string} errorId
 * @property {string} name
 * @property {string} message
 * @property {string} status
 */
declare class NotionAgent {
    token: string;
    timezone: string;
    locale: string;
    suppressWarning: boolean;
    verbose: boolean;
    constructor(opts?: AgentOptions);
    /**
     * Execute a raw call to /api/v3/loadPageChunk
     * @param pageID - The page ID to request.
     * @param chunkNo - The chunk number to request.
     * @param cursor - The cursor.
     * @returns JSON object from response.
     */
    loadPageChunk(pageID: string, chunkNo?: number, cursor?: {
        "stack": never[];
    }): Promise<{
        statusCode: number;
        data: any;
    }>;
    /**
     * Execute a raw call to /api/v3/getAssetsJson
     * @returns JSON object from response.
     */
    getAssetsJson(): Promise<{
        statusCode: number;
        data: any;
    }>;
    /**
     * Execute a raw call to /api/v3/getRecordValues
     * @param requests - The requests to make.
     * @returns JSON object from response.
     */
    getRecordValues(requests: RecordRequest[]): Promise<{
        statusCode: number;
        data: any;
    }>;
    /**
     * Execute a raw call to /api/v3/loadUserContent
     * @returns JSON object from response.
     */
    loadUserContent(): Promise<{
        statusCode: number;
        data: any;
    }>;
    /**
     * Execute a raw call to /api/v3/queryCollection
     * @param collectionID
     * @param collectionViewID
     * @param aggregateQueries
     * @returns JSON object from response.
     */
    queryCollection(collectionID: string, collectionViewID: string, aggregateQueries: AggregateQuery[]): Promise<{
        statusCode: number;
        data: any;
    }>;
    /**
     * Execute a raw call to /api/v3/submitTransaction
     * @param operations
     * @returns JSON object from response. Normally {}.
     */
    submitTransaction(operations: DocumentOperation[]): Promise<{
        statusCode: number;
        data: any;
    }>;
    /**
     * Make a request to Notion API.
     * @param apiURL - Notion API URL.
     * @param requestData - Request body.
     * @returns JSON object from response.
     */
    private makeRequestToNotion;
}
export { NotionAgent };
//# sourceMappingURL=index.d.ts.map