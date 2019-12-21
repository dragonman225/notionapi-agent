/** Import other sripts. */
import { post } from "./http-util"
import { log } from "./log"
import { strings } from "./strings"

/** Import typings. */
import {
  GetRecordValuesRequest, GetRecordValuesResponse,
  GetUserSharedPagesRequest, GetUserSharedPagesResponse,
  LoadUserContentResponse,
  QueryCollectionRequest, QueryCollectionResponse,
  ErrorResponse
} from "./interfaces/notion/api"

/**
 * Options to config Notion API agent.
 */
interface AgentOptions {
  server?: string
  token?: string
  debug?: boolean
}



/**
 * Create an asynchronous Notion API function.
 * @param url The API's full URL.
 * @param token The API token for authentication.
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
      .setHeader("origin", strings.DEFAULT_SERVER)
      .setHeader("referer", strings.DEFAULT_SERVER)
      .setHeader("user-agent", strings.REQUEST_USER_AGENT)
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
 */
function createAgent(opts: AgentOptions = {}) {
  const token = opts.token ? opts.token : ""
  const server = opts.server ? opts.server : strings.DEFAULT_SERVER

  if (opts.debug) {
    log.setLogLevel("debug")
  }

  log.debug(`agent.ts: Create API agent with\
 server "${server}" and token "${token}".`)

  return {
    getRecordValues:
      createAPI<GetRecordValuesRequest, GetRecordValuesResponse>(
        `${server}/api/v3/getRecordValues`, token
      ),
    getUserSharedPages:
      createAPI<GetUserSharedPagesRequest, GetUserSharedPagesResponse>(
        `${server}/api/v3/getUserSharedPages`,
        token),
    loadUserContent:
      createAPI<{}, LoadUserContentResponse>(
        `${server}/api/v3/loadUserContent`, token
      ),
    queryCollection:
      createAPI<QueryCollectionRequest, QueryCollectionResponse>(
        `${server}/api/v3/queryCollection`, token
      )
  }
}

export { createAgent }