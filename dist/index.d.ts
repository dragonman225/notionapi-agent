/*************************************************************************
 * NotionAgent data structures                                           *
 *************************************************************************/
/**
 * Options of NotionAgent constructor
 * @typedef AgentOptions
 * @property {string} token - Login token (`token_v2` field in cookie)
 * @property {string} timezone - User's timezone
 * @property {string} locale - User's locale
 * @property {boolean} suppressWarning - Whether to hide warnings
 * @property {boolean} verbose - Whether to show status messages
 */
export interface AgentOptions {
    token?: string;
    timezone?: string;
    locale?: string;
    suppressWarning?: boolean;
    verbose?: boolean;
}
/**
 * A request object in getRecordValues' `requests` array
 * @typedef RecordRequest
 * @property {string} id - ID of a item
 * @property {string} table - The table to query
 */
export interface RecordRequest {
    id: string;
    table: string;
}
/**
 * An operation on Notion.so document
 * @typedef DocumentOperation
 * @property {string} id - The ID of the block where the operation apply
 * @property {string} table - Usually "block"
 * @property {string[]} path - Property path relative to the block itself
 * @property {string} command - The operation type. e.g. "set", "update"
 * @property {any[]} args - The arguments of the command
 */
export interface DocumentOperation {
    id: string;
    table: string;
    path: string[];
    command: string;
    args: any[];
}
/*************************************************************************
 * Notion.so data structures                                             *
 *************************************************************************/
/** /api/v3/getAssetsJson response */
export interface GetAssetsJsonResponse {
    entry: string;
    files: AssetFile[];
    headersWhitelist: string[];
    proxyServerPathPrefixes: string[];
    version: string;
}
/** /api/v3/getRecordValues response */
export interface GetRecordValuesResponse {
    results: any[];
}
/** /api/v3/loadPageChunk response */
export interface LoadPageChunkResponse {
    recordMap: RecordMap;
    cursor: Cursor;
}
export interface AssetFile {
    hash: string;
    path: string;
    size: number;
}
export interface RecordMap {
    block: {
        [key: string]: {
            role: string;
            value: BlockRecord;
        };
    };
    collection: {
        [key: string]: {
            role: string;
            value: CollectionRecord;
        };
    };
    collection_view: {
        [key: string]: {
            role: string;
            value: CollectionViewRecord;
        };
    };
    notion_user: {
        [key: string]: {
            role: string;
            value: NotionUserRecord;
        };
    };
    space: {
        [key: string]: {
            role: string;
            value: SpaceRecord;
        };
    };
}
export interface Cursor {
    stack: [];
}
export interface BlockRecord {
    id: string;
    version: number;
    type: string;
    view_ids?: string[];
    collection_id?: string;
    properties?: BlockProperties;
    format?: BlockFormat;
    permissions?: Permission[];
    content?: string[];
    created_by: string;
    created_time: number;
    last_edited_by: string;
    last_edited_time: number;
    parent_id: string;
    parent_table: string;
    alive: boolean;
    copied_from?: string;
}
export interface BlockProperties {
    link?: {
        0: {
            0: string;
        };
    };
    title?: StyledString[];
    description?: {
        0: {
            0: string;
        };
    };
    checked?: {
        0: {
            0: 'Yes' | 'No';
        };
    };
    source?: {
        0: {
            0: string;
        };
    };
    language?: {
        0: {
            0: string;
        };
    };
}
/**
 * For non-boolean properties, test with
 *  <property> || <default_value>.
 *
 * For boolean properties, test with
 *  typeof <property> !== 'undefined' ? <property> : <default_value>
 *  because we have to distinguish `false` and `undefined`.
 */
export interface BlockFormat {
    block_color?: string;
    block_width?: number;
    block_height?: number;
    block_locked?: boolean;
    block_full_width?: boolean;
    block_page_width?: boolean;
    block_aspect_ratio?: number;
    block_preserve_scale?: boolean;
    block_locked_by?: string;
    bookmark_icon?: string;
    bookmark_cover?: string;
    code_wrap?: boolean;
    column_ratio?: number;
    display_source?: string;
    page_icon?: string;
    page_cover?: string;
    page_full_width?: boolean;
    page_cover_position?: number;
}
export interface CollectionRecord {
    id: string;
    name: {
        0: {
            0: string;
        };
    };
    icon?: string;
    cover?: string;
    description?: StyledString[];
    format?: CollectionFormat;
    parent_id: string;
    parent_table: string;
    schema: {
        [key: string]: CollectionColumnInfo;
    };
    version: number;
    alive: boolean;
}
export interface CollectionFormat {
    collection_cover_position?: number;
}
export interface CollectionColumnInfo {
    name: string;
    options: CollectionColumnOption[];
    type: string;
}
export interface CollectionColumnOption {
    id: string;
    color: string;
    value: string;
}
export interface CollectionViewRecord {
    alive: boolean;
    format: CollectionViewFormat;
    id: string;
    name: string;
    page_sort: string[];
    parent_id: string;
    parent_table: string;
    query: Query;
    type: string;
    version: number;
}
export interface CollectionViewFormat {
    table_properties?: TableProperty[];
    table_wrap?: boolean;
    gallery_properties?: GalleryProperty[];
    gallery_cover?: {
        type: string;
    };
    gallery_cover_aspect?: string;
    gallery_title_visible?: boolean;
}
export interface TableProperty {
    width: number;
    visible: boolean;
    property: string;
}
export interface GalleryProperty {
    visible: boolean;
    property: string;
}
export interface NotionUserRecord {
    id: string;
    version: number;
    email: string;
    given_name: string;
    family_name: string;
    profile_photo: string;
    onboarding_completed: boolean;
    mobile_onboarding_completed: boolean;
    clipper_onboarding_completed: boolean;
}
export interface SpaceRecord {
    id: string;
    version: number;
    name: string;
    permissions: Permission[];
    beta_enabled: boolean;
    pages: string[];
    created_by: string;
    created_time: number;
    last_edited_by: string;
    last_edited_time: number;
}
export interface Permission {
    role: string;
    type: string;
    user_id: string;
    allow_duplicate?: boolean;
    allow_search_engine_indexing?: boolean;
}
export interface StyledString {
    0: string;
    1?: TextStyle[];
}
export interface TextStyle {
    0: string;
    1?: string | InlineDate;
}
export interface InlineDate {
    type: string;
    start_date: string;
    date_format: string;
}
/** Query */
export interface Query {
    sort: SortQuery[];
    aggregate?: AggregateQuery[];
    filter: [];
    filter_operator: string;
}
/** A sort query */
export interface SortQuery {
    id: string;
    type: string;
    property: string;
    direction: string;
}
/**
 * An aggregate query
 * @typedef AggregateQuery
 * @property {string} id
 * @property {string} type
 * @property {string} property
 * @property {string} view_type
 * @property {string} aggregation_type
 */
export interface AggregateQuery {
    id: string;
    type: string;
    property: string;
    view_type: string;
    aggregation_type: string;
}
/**
 * Error response when HTTP statusCode is 401
 * @typedef NotionError
 * @property {string} errorId
 * @property {string} name
 * @property {string} message
 * @property {string} status
 */
export interface NotionError {
    errorId: string;
    name: string;
    message: string;
    status: string;
}
/*************************************************************************
 * NotionAgent implementation                                            *
 *************************************************************************/
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
     * @returns HTTP status code and JSON object from response.
     */
    loadPageChunk(pageID: string, chunkNo?: number, cursor?: {
        "stack": never[];
    }): Promise<{
        statusCode: number;
        data: LoadPageChunkResponse | NotionError;
    }>;
    /**
     * Execute a raw call to /api/v3/getAssetsJson
     * @returns HTTP status code and JSON object from response.
     */
    getAssetsJson(): Promise<{
        statusCode: number;
        data: GetAssetsJsonResponse | NotionError;
    }>;
    /**
     * Execute a raw call to /api/v3/getRecordValues
     * @param requests - The requests to make.
     * @returns HTTP status code and JSON object from response.
     */
    getRecordValues(requests: RecordRequest[]): Promise<{
        statusCode: number;
        data: GetRecordValuesResponse | NotionError;
    }>;
    /**
     * Execute a raw call to /api/v3/loadUserContent
     * @returns HTTP status code and JSON object from response.
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
     * @returns HTTP status code and JSON object from response.
     */
    queryCollection(collectionID: string, collectionViewID: string, aggregateQueries: AggregateQuery[]): Promise<{
        statusCode: number;
        data: any;
    }>;
    /**
     * Execute a raw call to /api/v3/submitTransaction
     * @param operations
     * @returns HTTP status code and JSON object from response.
     */
    submitTransaction(operations: DocumentOperation[]): Promise<{
        statusCode: number;
        data: any;
    }>;
    /**
     * Make a request to Notion API.
     * @param apiURL - Notion API URL.
     * @param requestData - Request body.
     * @returns HTTP status code and JSON object from response.
     */
    private makeRequestToNotion;
}
export { NotionAgent };
//# sourceMappingURL=index.d.ts.map