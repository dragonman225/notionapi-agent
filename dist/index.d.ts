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
/*************************************************************************
 * Notion.so data structures                                             *
 *************************************************************************/
/** /api/v3/getAssetsJson response when HTTP statusCode is 200
 * @typedef GetAssetsJsonResponse
 * @property {string} entry - Path to HTML index
 * @property {AssetFile[]} files - Such as scripts, stylesheets, images
 * @property {string[]} headersWhitelist - A list of HTTP headers
 * @property {string[]} proxyServerPathPrefixes - A list of HTTP paths
 * @property {string} version - The version of Notion app
 */
export interface GetAssetsJsonResponse {
    entry: string;
    files: AssetFile[];
    headersWhitelist: string[];
    proxyServerPathPrefixes: string[];
    version: string;
}
/** /api/v3/getRecordValues response when HTTP statusCode is 200 */
export interface GetRecordValuesResponse {
    results: Record[];
}
/** /api/v3/loadPageChunk response when HTTP statusCode is 200 */
export interface LoadPageChunkResponse {
    recordMap: {
        block: {
            [key: string]: BlockRecord;
        };
        collection: {
            [key: string]: CollectionRecord;
        };
        collection_view: {
            [key: string]: CollectionViewRecord;
        };
        notion_user: {
            [key: string]: NotionUserRecord;
        };
        space: {
            [key: string]: SpaceRecord;
        };
    };
    cursor: Cursor;
}
/** /api/v3/loadUserContent response when HTTP statusCode is 200 */
export interface LoadUserContentResponse {
    recordMap: {
        notion_user: {
            [key: string]: NotionUserRecord;
        };
        user_root: {
            [key: string]: UserRootRecord;
        };
        user_settings: {
            [key: string]: UserSettingsRecord;
        };
        space_view: {
            [key: string]: SpaceViewRecord;
        };
        space: {
            [key: string]: SpaceRecord;
        };
        block: {
            [key: string]: BlockRecord;
        };
        collection: {
            [key: string]: CollectionRecord;
        };
    };
}
/** /api/v3/queryCollection response when HTTP statusCode is 200 */
export interface QueryCollectionResponse {
    result: {
        type: string;
        blockIds: string[];
        aggregationResults: AggregationResult[];
        total: number;
    };
    recordMap: {
        collection: {
            [key: string]: CollectionRecord;
        };
        collection_view: {
            [key: string]: CollectionViewRecord;
        };
        block: {
            [key: string]: BlockRecord;
        };
        space: {
            [key: string]: SpaceRecord;
        };
    };
}
/** /api/v3/submitTransaction response when HTTP statusCode is 200 */
export interface SubmitTransactionResponse {
}
/** /api/v3/getSnapshotsList response when HTTP statusCode is 200 */
export interface GetSnapshotsListResponse {
    snapshots: Snapshot[];
}
/** /api/v3/getSnapshotsList response when HTTP statusCode is 200 */
export interface GetActivityLogResponse {
    activityIds: string[];
    recordMap: {
        block: {
            [key: string]: BlockRecord;
        };
        space: {
            [key: string]: SpaceRecord;
        };
        notion_user: {
            [key: string]: NotionUserRecord;
        };
        collection: {
            [key: string]: CollectionRecord;
        };
        activity: {
            [key: string]: ActivityRecord;
        };
        follow: {
            [key: string]: FollowRecord;
        };
        slack_integration: {
            [key: string]: SlackIntegrationRecord;
        };
    };
}
/**
 * /api/v3/xxx response when HTTP statusCode is not 200
 * @typedef ErrorResponse
 * @property {string} errorId
 * @property {string} name
 * @property {string} message
 * @property {string} status
 */
export interface ErrorResponse {
    errorId: string;
    name: string;
    message: string;
    status: string;
}
export interface AssetFile {
    hash: string;
    path: string;
    size: number;
}
export interface Record {
    role: string;
    value: Block | Collection | CollectionView | NotionUser | UserRoot | UserSettings | Space | SpaceView | Activity | Follow | SlackIntegration;
}
export interface BlockRecord extends Record {
    value: Block;
}
export interface CollectionRecord extends Record {
    value: Collection;
}
export interface CollectionViewRecord extends Record {
    value: CollectionView;
}
export interface NotionUserRecord extends Record {
    value: NotionUser;
}
export interface UserRootRecord extends Record {
    value: UserRoot;
}
export interface UserSettingsRecord extends Record {
    value: UserSettings;
}
export interface SpaceRecord extends Record {
    value: Space;
}
export interface SpaceViewRecord extends Record {
    value: SpaceView;
}
export interface ActivityRecord extends Record {
    value: Activity;
}
export interface FollowRecord extends Record {
    value: Follow;
}
export interface SlackIntegrationRecord extends Record {
    value: SlackIntegration;
}
export interface Cursor {
    stack: StackItem[][];
}
export interface StackItem {
    table: string;
    id: string;
    index: number;
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
export interface Block {
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
export interface Collection {
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
export interface CollectionView {
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
export interface NotionUser {
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
export interface UserRoot {
    id: string;
    version: number;
    space_views: string[];
    left_spaces: string[];
}
export interface UserSettings {
    id: string;
    version: number;
    settings: {
        locale: string;
        persona: string;
        use_case: string;
        time_zone: string;
        user_case: string;
        signup_time: number;
        used_android_app: boolean;
        start_day_of_week: number;
        used_mobile_web_app: boolean;
        used_desktop_web_app: boolean;
    };
}
export interface Space {
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
export interface SpaceView {
    id: string;
    version: number;
    space_id: string;
    parent_id: string;
    parent_table: string;
    alive: boolean;
    notify_mobile: boolean;
    notify_desktop: boolean;
    notify_email: boolean;
    visited_templates: string[];
    sidebar_hidden_templates: string[];
    created_getting_started: boolean;
}
export interface Snapshot {
    id: string;
    version: number;
    last_version: number;
    parent_table: string;
    parent_id: string;
    timestamp: number;
    inline_collection_block_ids: string[] | null;
    collection_ids: string[] | null;
    author_ids: string[];
}
/**
 * If the activity is collection-related, it has additional
 * collection_id property, also all its edits are collection-related
 */
export interface Activity {
    id: string;
    version: number;
    index: number;
    type: string;
    parent_table: string;
    parent_id: string;
    start_time: string;
    end_time: string;
    invalid: boolean;
    space_id: string;
    navigable_block_id: string;
    collection_id?: string;
    edits: Edit[];
}
/**
 * If the edited block is a page in a collection, it has additional
 * block_schema and collection_id property
 */
export interface Edit {
    type: string;
    block_id: string;
    space_id: string;
    user_ids: string[];
    timestamp: number;
    block_data: {};
    block_schema?: {
        [key: string]: CollectionColumnInfo;
    };
    collection_id?: string;
    navigable_block_id: string;
}
/**
 * A "block-created" edit
 */
export interface BlockCreatedEdit extends Edit {
    type: 'block-created';
    block_data: {
        block_value: Block;
    };
}
/**
 * A "block-changed" edit
 */
export interface BlockChangedEdit extends Edit {
    type: 'block-changed';
    block_data: {
        after: {
            block_value: Block;
        };
        before: {
            block_value: Block;
        };
    };
}
export interface Follow {
    id: string;
    version: number;
    following: boolean;
    user_id: string;
    navigable_block_id: string;
    created_time: number;
}
export interface SlackIntegration {
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
export interface AggregationResult {
    id: string;
    value: number;
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
    loadPageChunk(pageID: string, chunkNo?: number, cursor?: Cursor): Promise<{
        statusCode: number;
        data: LoadPageChunkResponse | ErrorResponse;
    }>;
    /**
     * Execute a raw call to /api/v3/getAssetsJson
     * @returns HTTP status code and JSON object from response.
     */
    getAssetsJson(): Promise<{
        statusCode: number;
        data: GetAssetsJsonResponse | ErrorResponse;
    }>;
    /**
     * Execute a raw call to /api/v3/getRecordValues
     * @param requests - The requests to make.
     * @returns HTTP status code and JSON object from response.
     */
    getRecordValues(requests: RecordRequest[]): Promise<{
        statusCode: number;
        data: GetRecordValuesResponse | ErrorResponse;
    }>;
    /**
     * Execute a raw call to /api/v3/loadUserContent
     * @returns HTTP status code and JSON object from response.
     */
    loadUserContent(): Promise<{
        statusCode: number;
        data: LoadUserContentResponse | ErrorResponse;
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
        data: QueryCollectionResponse | ErrorResponse;
    }>;
    /**
     * Execute a raw call to /api/v3/submitTransaction
     * @param operations
     * @returns HTTP status code and JSON object from response.
     */
    submitTransaction(operations: DocumentOperation[]): Promise<{
        statusCode: number;
        data: SubmitTransactionResponse | ErrorResponse;
    }>;
    /**
     * Get snapshots list of a block (/api/v3/getSnapshotsList)
     * @param blockId
     * @param size - Max number of snapshots to get
     * @returns HTTP status code and JSON object from response.
     */
    getSnapshotsList(blockId: string, size: number): Promise<{
        statusCode: number;
        data: GetSnapshotsListResponse | ErrorResponse;
    }>;
    /**
     * Get activity log of a block (/api/v3/getActivityLog)
     * @param navigableBlockId - ID of a page or collection_view_page block.
     *                         Other blocks don't have meaningful responses.
     * @param size - Max number of activities to get.
     * @param spaceId - The workspace ID of the navigableBlock.
     * @param collectionId - ID of a collection. Only effective when
     *                     navigableBlock is a collection_view_page.
     * @returns HTTP status code and JSON object from response.
     */
    getActivityLog(navigableBlockId: string, size: number, spaceId: string, collectionId?: string): Promise<{
        statusCode: number;
        data: GetActivityLogResponse | ErrorResponse;
    }>;
    /**
     * Make a request to Notion API.
     * @param apiURL - Notion API URL.
     * @param requestData - Request body.
     * @returns HTTP status code and JSON object from response.
     */
    private makeRequestToNotion;
}
/*************************************************************************
 * Module exports                                                        *
 *************************************************************************/
export { NotionAgent };
//# sourceMappingURL=index.d.ts.map