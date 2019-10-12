/*************************************************************************
 * Library imports                                                       *
 *************************************************************************/
import assert from 'assert'
import { makeHTTPSRequest } from '@dnpr/make-request'
import { log, parseJSON } from './utils'
import { strings } from './strings'

/*************************************************************************
 * Constants                                                             *
 *************************************************************************/
const API_BASE = '/api/v3'

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
  token?: string
  timezone?: string
  locale?: string
  suppressWarning?: boolean
  verbose?: boolean
}

/*************************************************************************
 * Notion.so data structures                                             *
 *************************************************************************/
/* API structures -------------------------------------------------------*/
/** /api/v3/getAssetsJson response 
 * @typedef GetAssetsJsonResponse
 * @property {string} entry - Path to HTML index
 * @property {AssetFile[]} files - Assets such as scripts, stylesheets, images
 * @property {string[]} headersWhitelist - A list of HTTP headers
 * @property {string[]} proxyServerPathPrefixes - A list of HTTP paths
 * @property {string} version - The version of Notion app
 */
export interface GetAssetsJsonResponse {
  entry: string
  files: AssetFile[]
  headersWhitelist: string[]
  proxyServerPathPrefixes: string[]
  version: string
}

/** /api/v3/getRecordValues response */
export interface GetRecordValuesResponse {
  results: Record[]
}

/** /api/v3/loadPageChunk response */
export interface LoadPageChunkResponse {
  recordMap: {
    block: { [key: string]: Record & { value: Block } }
    collection: { [key: string]: Record & { value: Collection } }
    collection_view: { [key: string]: Record & { value: CollectionView } }
    notion_user: { [key: string]: Record & { value: User } }
    space: { [key: string]: Record & { value: Space } }
  }
  cursor: Cursor
}

/** /api/v3/loadUserContent response */
export interface LoadUserContentResponse {
  recordMap: {
    notion_user: { [key: string]: Record & { value: User } }
    user_root: { [key: string]: Record & { value: UserRoot } }
    user_settings: { [key: string]: Record & { value: UserSettings } }
    space_view: { [key: string]: Record & { value: SpaceView } }
    space: { [key: string]: Record & { value: Space } }
    block: { [key: string]: Record & { value: Block } }
    collection: { [key: string]: Record & { value: Collection } }
  }
}

/** /api/v3/queryCollection response */
export interface QueryCollectionResponse {
  result: {
    type: string
    blockIds: string[]
    aggregationResults: AggregationResult[]
    total: number
  }
  recordMap: {
    collection: { [key: string]: Record & { value: Collection } }
    collection_view: { [key: string]: Record & { value: CollectionView } }
    block: { [key: string]: Record & { value: Block } }
    space: { [key: string]: Record & { value: Space } }
  }
}

/** /api/v3/submitTransaction response */
export interface SubmitTransactionResponse {
  // empty
}

/**
 * Error response when HTTP statusCode is 401
 * @typedef ErrorResponse
 * @property {string} errorId
 * @property {string} name
 * @property {string} message
 * @property {string} status
 */
export interface ErrorResponse {
  errorId: string
  name: string
  message: string
  status: string
}

/* API-related structures -----------------------------------------------*/
export interface AssetFile {
  hash: string
  path: string
  size: number
}

export interface Record {
  role: string
  value: Block | Collection | CollectionView | User | UserRoot | UserSettings | Space | SpaceView
}

export interface Cursor {
  stack: []
}

/**
 * A request object in getRecordValues' `requests` array
 * @typedef RecordRequest
 * @property {string} id - ID of a item
 * @property {string} table - The table to query
 */
export interface RecordRequest {
  id: string
  table: string
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
  id: string
  table: string
  path: string[]
  command: string
  args: any[]
}

/* Block Record ---------------------------------------------------------*/
export interface Block {
  id: string
  version: number
  type: string
  view_ids?: string[]
  collection_id?: string
  properties?: BlockProperties
  format?: BlockFormat
  permissions?: Permission[]
  content?: string[]
  created_by: string
  created_time: number
  last_edited_by: string
  last_edited_time: number
  parent_id: string
  parent_table: string
  alive: boolean
  copied_from?: string
}

export interface BlockProperties {
  link?: {
    0: { 0: string } // bookmark
  }
  title?: StyledString[] // text, heading, list, bookmark
  description?: {
    0: { 0: string } // bookmark
  }
  checked?: {
    0: { 0: 'Yes' | 'No' } // to_do
  }
  source?: {
    0: { 0: string } // audio
  }
  language?: {
    0: { 0: string } // code
  }
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
  block_color?: string
  block_width?: number // image, video
  block_height?: number // codepen
  block_locked?: boolean
  block_full_width?: boolean // image, video
  block_page_width?: boolean // image, video
  block_aspect_ratio?: number // video
  block_preserve_scale?: boolean // video
  block_locked_by?: string
  bookmark_icon?: string // bookmark
  bookmark_cover?: string // bookmark
  code_wrap?: boolean // code
  column_ratio?: number // column
  display_source?: string // image, video
  page_icon?: string
  page_cover?: string
  page_full_width?: boolean
  page_cover_position?: number
}

/* Collection Record ----------------------------------------------------*/
export interface Collection {
  id: string
  name: {
    0: { 0: string }
  }
  icon?: string
  cover?: string
  description?: StyledString[]
  format?: CollectionFormat
  parent_id: string
  parent_table: string
  schema: {
    [key: string]: CollectionColumnInfo
  }
  version: number
  alive: boolean
}

export interface CollectionFormat {
  collection_cover_position?: number
}

export interface CollectionColumnInfo {
  name: string
  options: CollectionColumnOption[]
  type: string
}

export interface CollectionColumnOption {
  id: string
  color: string
  value: string
}

/* CollectionView Record ------------------------------------------------*/
export interface CollectionView {
  alive: boolean
  format: CollectionViewFormat
  id: string
  name: string
  page_sort: string[]
  parent_id: string
  parent_table: string
  query: Query
  type: string
  version: number
}

export interface CollectionViewFormat {
  table_properties?: TableProperty[]
  table_wrap?: boolean
  gallery_properties?: GalleryProperty[]
  gallery_cover?: { type: string }
  gallery_cover_aspect?: string
  gallery_title_visible?: boolean
}

export interface TableProperty {
  width: number
  visible: boolean
  property: string
}

export interface GalleryProperty {
  visible: boolean
  property: string
}

/* User Record ----------------------------------------------------------*/
export interface User {
  id: string
  version: number
  email: string
  given_name: string
  family_name: string
  profile_photo: string
  onboarding_completed: boolean
  mobile_onboarding_completed: boolean
  clipper_onboarding_completed: boolean
}

/* UserRoot Record ------------------------------------------------------*/
export interface UserRoot {
  id: string
  version: number
  space_views: string[]
  left_spaces: string[]
}

/* UserSettings Record --------------------------------------------------*/
export interface UserSettings {
  id: string
  version: number
  settings: {
    locale: string
    persona: string
    use_case: string
    time_zone: string
    user_case: string
    signup_time: number
    used_android_app: boolean
    start_day_of_week: number
    used_mobile_web_app: boolean
    used_desktop_web_app: boolean
  }
}

/* Space Record ---------------------------------------------------------*/
export interface Space {
  id: string
  version: number
  name: string
  permissions: Permission[]
  beta_enabled: boolean
  pages: string[]
  created_by: string
  created_time: number
  last_edited_by: string
  last_edited_time: number
}

/* SpaceView Record -----------------------------------------------------*/
export interface SpaceView {
  id: string
  version: number
  space_id: string
  parent_id: string
  parent_table: string
  alive: boolean
  notify_mobile: boolean
  notify_desktop: boolean
  notify_email: boolean
  visited_templates: string[]
  sidebar_hidden_templates: string[]
  created_getting_started: boolean
}

/* Record-related structures --------------------------------------------*/
export interface Permission {
  role: string
  type: string
  user_id: string
  allow_duplicate?: boolean
  allow_search_engine_indexing?: boolean
}

export interface StyledString {
  0: string
  1?: TextStyle[]
}

export interface TextStyle {
  0: string
  1?: string | InlineDate
}

export interface InlineDate {
  type: string
  start_date: string
  date_format: string
}

/** Query */
export interface Query {
  sort: SortQuery[]
  aggregate?: AggregateQuery[]
  filter: []
  filter_operator: string
}

/** A sort query */
export interface SortQuery {
  id: string
  type: string
  property: string
  direction: string
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
  id: string
  type: string
  property: string
  view_type: string
  aggregation_type: string
}

export interface AggregationResult {
  id: string
  value: number
}

/*************************************************************************
 * NotionAgent implementation                                            *
 *************************************************************************/
/* An agent to interact with Notion.so's HTTP API */
class NotionAgent {
  token: string
  timezone: string
  locale: string
  suppressWarning: boolean
  verbose: boolean

  constructor(opts: AgentOptions = {
    token: '',
    timezone: 'Asia/Taipei',
    locale: 'en',
    suppressWarning: false,
    verbose: false
  }) {
    this.token = opts.token || ''
    this.timezone = opts.timezone || 'Asia/Taipei'
    this.locale = opts.locale || 'en'
    this.suppressWarning = (typeof opts.suppressWarning === 'undefined')
      ? false : opts.suppressWarning
    this.verbose = (typeof opts.verbose === 'undefined')
      ? false : opts.verbose

    if (!this.suppressWarning && this.token.length === 0) {
      log(strings.NO_TOKEN_WARNING)
    }
  }



  /**
   * Execute a raw call to /api/v3/loadPageChunk
   * @param pageID - The page ID to request.
   * @param chunkNo - The chunk number to request.
   * @param cursor - The cursor.
   * @returns HTTP status code and JSON object from response.
   */
  loadPageChunk(
    pageID: string,
    chunkNo: number = 0,
    cursor = { "stack": [] }
  ): Promise<{
    statusCode: number,
    data: LoadPageChunkResponse | ErrorResponse
  }> {

    assert(pageID, strings.PAGEID_NOT_FOUND)

    const apiURL = API_BASE + '/loadPageChunk'

    const requestData = JSON.stringify({
      "pageId": pageID,
      "limit": 50,
      "cursor": cursor,
      "chunkNumber": chunkNo,
      "verticalColumns": false
    })

    return this.makeRequestToNotion(apiURL, requestData)

  } // loadPageChunk



  /**
   * Execute a raw call to /api/v3/getAssetsJson
   * @returns HTTP status code and JSON object from response.
   */
  getAssetsJson(): Promise<{
    statusCode: number,
    data: GetAssetsJsonResponse | ErrorResponse
  }> {

    const apiURL = API_BASE + '/getAssetsJson'

    const requestData = JSON.stringify({})

    return this.makeRequestToNotion(apiURL, requestData)

  } // getAssetsJson



  /**
   * Execute a raw call to /api/v3/getRecordValues
   * @param requests - The requests to make.
   * @returns HTTP status code and JSON object from response.
   */
  getRecordValues(
    requests: RecordRequest[]
  ): Promise<{
    statusCode: number,
    data: GetRecordValuesResponse | ErrorResponse
  }> {

    assert(Array.isArray(requests), strings.IDS_NOT_ARRAY)

    const apiURL = API_BASE + '/getRecordValues'

    const requestData = JSON.stringify({
      "requests": requests.map((request) => {
        return {
          "table": request.table,
          "id": request.id
        }
      })
    })

    return this.makeRequestToNotion(apiURL, requestData)

  } // getRecordValues



  /**
   * Execute a raw call to /api/v3/loadUserContent
   * @returns HTTP status code and JSON object from response.
   */
  loadUserContent(): Promise<{
    statusCode: number,
    data: LoadUserContentResponse | ErrorResponse
  }> {

    const apiURL = API_BASE + '/loadUserContent'

    const requestData = JSON.stringify({})

    return this.makeRequestToNotion(apiURL, requestData)

  } // loadUserContent



  /**
   * Execute a raw call to /api/v3/queryCollection
   * @param collectionID
   * @param collectionViewID
   * @param aggregateQueries
   * @returns HTTP status code and JSON object from response.
   */
  queryCollection(
    collectionID: string,
    collectionViewID: string,
    aggregateQueries: AggregateQuery[]
  ): Promise<{
    statusCode: number
    data: QueryCollectionResponse | ErrorResponse
  }> {

    assert(collectionID, strings.COLLECTION_ID_NOT_FOUND)
    assert(collectionViewID, strings.COLLECTION_VIEW_ID_NOT_FOUND)

    const apiURL = API_BASE + '/queryCollection'

    const requestData = JSON.stringify({
      "collectionId": collectionID,
      "collectionViewId": collectionViewID,
      "query": {
        "aggregate": aggregateQueries,
        "filter_operator": "and",
        "filter": [],
        "sort": []
      },
      "loader": {
        "type": "table",
        "limit": 10000,
        "userTimeZone": this.timezone,
        "userLocale": this.locale,
        "loadContentCover": true
      }
    })

    return this.makeRequestToNotion(apiURL, requestData)

  } // queryCollection



  /**
   * Execute a raw call to /api/v3/submitTransaction
   * @param operations
   * @returns HTTP status code and JSON object from response.
   */
  submitTransaction(
    operations: DocumentOperation[]
  ): Promise<{
    statusCode: number
    data: SubmitTransactionResponse | ErrorResponse
  }> {

    assert(Array.isArray(operations))
    operations.forEach(operation => {
      assert(operation.id)
      assert(operation.table)
      assert(operation.path)
      assert(operation.command)
      assert(operation.args)
    })

    const apiURL = API_BASE + '/submitTransaction'

    const requestData = JSON.stringify({
      "operations": operations
    })

    return this.makeRequestToNotion(apiURL, requestData)

  } // submitTransaction



  /**
   * Make a request to Notion API.
   * @param apiURL - Notion API URL.
   * @param requestData - Request body.
   * @returns HTTP status code and JSON object from response.
   */
  private async makeRequestToNotion(
    apiURL: string,
    requestData: string
  ): Promise<{ statusCode: number, data: any }> {

    /* Options passed to https.request(). */
    const httpOptions = {
      hostname: 'www.notion.so',
      port: 443,
      path: apiURL,
      method: 'POST',
      authority: 'www.notion.so',
      headers: {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'accept-encoding': 'gzip, deflate',
        'content-length': requestData.length,
        'content-type': 'application/json',
        'cookie': `token_v2=${this.token}`,
        'origin': 'https://www.notion.so',
        'referer': 'https://www.notion.so',
        'user-agent': strings.REQUEST_USER_AGENT
      }
    }

    if (this.verbose)
      log(`Request ${apiURL}, data ${requestData.slice(0, 40)} ...`)

    let res = await makeHTTPSRequest(httpOptions, requestData)
    let resParsed = {
      statusCode: res.statusCode as number,
      data: parseJSON(res.responseBuffer)
    }

    return resParsed

  } // makeRequestToNotion
} // NotionAgent



/* NotionAgent exports --------------------------------------------------*/
export { NotionAgent }