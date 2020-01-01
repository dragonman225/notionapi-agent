/** Import other sripts. */
import { post } from "./httputil"
import { log } from "./log"
import { Default } from "./strings"
import { APIError } from "./error/APIError"

/** Import typings. */
import {
  ErrorResponse,
  GetActivityLogRequest, GetActivityLogResponse,
  GetAssetsJsonRequest, GetAssetsJsonResponse,
  GetRecordValuesRequest, GetRecordValuesResponse,
  GetUserSharedPagesRequest, GetUserSharedPagesResponse,
  LoadPageChunkRequest, LoadPageChunkResponse,
  LoadUserContentRequest, LoadUserContentResponse,
  QueryCollectionRequest, QueryCollectionResponse,
  SubmitTransactionRequest, SubmitTransactionResponse
} from "./interfaces/notion-api"

/**
 * Options to config a Notion API agent instance.
 * 
 * @category Library
 */
interface CreateAgentOptions {
  /** Web address of the API server. Default: `"https://www.notion.so"`. */
  server?: string
  /**
   * Notion API token. Default: `""`. 
   * {@link https://github.com/dragonman225/notionapi-agent/blob/master/documentation/obtain-token/obtain-token.md | How to get it ?}
   */
  token?: string
  /** Whether to trun on debug message. Default: `false`. */
  debug?: boolean
}

/**
 * Notion API agent instance.
 * 
 * @category Library
 */
interface Agent {
  /**
   * POST /api/v3/getActivityLog
   * 
   * Get user activities of a navigable block, e.g. a page. 
   * Equivalent to the "Updates" button in Notion's UI.
   * 
   * @remark Must be authenticated even for public pages.
   */
  getActivityLog: (req: GetActivityLogRequest) => Promise<GetActivityLogResponse>
  /**
   * POST /api/v3/getAssetsJson
   * 
   * Get a list of static asset paths, current version number, and more.
   */
  getAssetsJson: (req: GetAssetsJsonRequest) => Promise<GetAssetsJsonResponse>
  /**
   * POST /api/v3/getRecordValues
   * 
   * Get records by table name and id.
   * 
   * If a {@link RecordRequest} is the i<sup>th</sup> element 
   * of {@link GetRecordValuesRequest.requests}, its result is 
   * the i<sup>th</sup> element of {@link GetRecordValuesResponse.results}.
   */
  getRecordValues: (req: GetRecordValuesRequest) => Promise<GetRecordValuesResponse>
  /**
   * POST /api/v3/getUserSharedPages
   * 
   * Get ids of pages created with **+ New Page** button at the top level 
   * of the user's workspace *AND* those not created at the top level of 
   * the user's workspace but had been moved to the top level some time 
   * after created.
   * 
   * To always get the top level pages of the user's workspace, 
   * use {@link Agent.loadUserContent}.
   */
  getUserSharedPages: (req: GetUserSharedPagesRequest) => Promise<GetUserSharedPagesResponse>
  /**
   * POST /api/v3/loadPageChunk
   * 
   * Load some data related to a page.
   */
  loadPageChunk: (req: LoadPageChunkRequest) => Promise<LoadPageChunkResponse>
  /**
   * POST /api/v3/loadUserContent
   * 
   * Get top level page blocks (`block` in 
   * {@link LoadUserContentResponse.recordMap}), 
   * user information, and workspace information.
   */
  loadUserContent: (req: LoadUserContentRequest) => Promise<LoadUserContentResponse>
  /**
   * POST /api/v3/queryCollection
   * 
   * Query a collection by id, view id, 
   * with aggregate, filter, sort functions.
   * 
   * To configure aggregate, filter, sort parameters, see 
   * {@link QueryCollectionRequest.query}.
   * 
   * Set `limit` in {@link QueryCollectionRequest.loader} 
   * to limit maximum number of items in response data.
   */
  queryCollection: (req: QueryCollectionRequest) => Promise<QueryCollectionResponse>
  /**
   * POST /api/v3/submitTransaction
   * 
   * Make changes to documents and settings.
   */
  submitTransaction: (req: SubmitTransactionRequest) => Promise<SubmitTransactionResponse>
}



/**
 * Create an asynchronous Notion API function.
 * @param url The API's full URL.
 * @param token The API token for authentication.
 * 
 * @category Library Internal
 */
function createAPI<Req, Res>(url: string, token: string) {

  log.debug(`agent.ts: Create API function with\
 URL "${url}"`)

  return async function (req: Req): Promise<Res> {

    log.debug(`agent.ts: Call API "${url}".`)

    const result = await post(url)
      .setHeader("accept", "*/*")
      .setHeader("accept-language", "en-US,en;q=0.9")
      .setHeader("cookie", `token_v2=${token};`)
      .setHeader("origin", Default.server)
      .setHeader("referer", Default.server)
      .setHeader("user-agent", Default.userAgent)
      .sendAsJson(req)

    if (result.hasOwnProperty("errorId")) {
      const error = result as ErrorResponse
      throw new APIError(error)
    }

    return result
  }
}



/**
 * Create a Notion API agent.
 * @param opts A config object.
 * 
 * @category Library
 */
function createAgent(opts: CreateAgentOptions = {}): Agent {
  const token = opts.token ? opts.token : ""
  const server = opts.server ? opts.server : Default.server

  if (opts.debug) {
    log.setLogLevel("debug")
  }

  log.debug(`agent.ts: Create API agent with\
 server "${server}" and token "${token.substr(0, 9)}..."`)

  const getActivityLog =
    createAPI<GetActivityLogRequest, GetActivityLogResponse>(
      `${server}/api/v3/getActivityLog`, token)

  const getAssetsJson =
    createAPI<GetAssetsJsonRequest, GetAssetsJsonResponse>(
      `${server}/api/v3/getAssetsJson`, token)

  const getRecordValues =
    createAPI<GetRecordValuesRequest, GetRecordValuesResponse>(
      `${server}/api/v3/getRecordValues`, token)

  const getUserSharedPages =
    createAPI<GetUserSharedPagesRequest, GetUserSharedPagesResponse>(
      `${server}/api/v3/getUserSharedPages`, token)

  const loadPageChunk =
    createAPI<LoadPageChunkRequest, LoadPageChunkResponse>(
      `${server}/api/v3/loadPageChunk`, token)

  const loadUserContent =
    createAPI<LoadUserContentRequest, LoadUserContentResponse>(
      `${server}/api/v3/loadUserContent`, token)

  const queryCollection =
    createAPI<QueryCollectionRequest, QueryCollectionResponse>(
      `${server}/api/v3/queryCollection`, token)

  const submitTransaction =
    createAPI<SubmitTransactionRequest, SubmitTransactionResponse>(
      `${server}/api/v3/submitTransaction`, token)

  return {
    getActivityLog,
    getAssetsJson,
    getRecordValues,
    getUserSharedPages,
    loadPageChunk,
    loadUserContent,
    queryCollection,
    submitTransaction
  }
}

export { createAgent }