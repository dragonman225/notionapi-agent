/** Import other sripts. */
import { post } from "./http-util"
import { log } from "./log"
import { Default } from "./strings"

/** Import typings. */
import {
  GetRecordValuesRequest, GetRecordValuesResponse,
  GetUserSharedPagesRequest, GetUserSharedPagesResponse,
  LoadUserContentResponse,
  QueryCollectionRequest, QueryCollectionResponse,
  ErrorResponse
} from "./interfaces/notion-api"

/**
 * Options to config Notion API agent.
 * 
 * @category Library
 */
interface AgentOptions {
  /** Web address of the API server. Default: `"https://www.notion.so"`. */
  server?: string
  /**
   * Notion API token. Default: `""`. 
   * {@link https://github.com/dragonman225/notionapi-agent/blob/master/documentation/obtain-token/obtain-token.md | Tutorial}
   */
  token?: string
  /** Whether to trun on debug message. Default: `false`. */
  debug?: boolean
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
 URL "${url}" and token "${token}".`)

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
      throw new Error(`Notion says "${error.name}: ${error.message}"`)
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
function createAgent(opts: AgentOptions = {}) {
  const token = opts.token ? opts.token : ""
  const server = opts.server ? opts.server : Default.server

  if (opts.debug) {
    log.setLogLevel("debug")
  }

  log.debug(`agent.ts: Create API agent with\
 server "${server}" and token "${token}".`)

  return {
    /** See {@link GetRecordValues} for more about this function. */
    getRecordValues:
      createAPI<GetRecordValuesRequest, GetRecordValuesResponse>(
        `${server}/api/v3/getRecordValues`, token
      ),
    /** See {@link GetUserSharedPages} for more about this function. */
    getUserSharedPages:
      createAPI<GetUserSharedPagesRequest, GetUserSharedPagesResponse>(
        `${server}/api/v3/getUserSharedPages`,
        token),
    /** See {@link LoadUserContent} for more about this function. */
    loadUserContent:
      createAPI<{}, LoadUserContentResponse>(
        `${server}/api/v3/loadUserContent`, token
      ),
    /** See {@link QueryCollection} for more about this function. */
    queryCollection:
      createAPI<QueryCollectionRequest, QueryCollectionResponse>(
        `${server}/api/v3/queryCollection`, token
      )
  }
}

export { createAgent }