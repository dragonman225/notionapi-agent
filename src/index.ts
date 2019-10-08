/* Library imports ------------------------------------------------------*/
import assert from 'assert'
import { makeHTTPSRequest } from '@dnpr/make-request'
import { log, parseJSON } from './utils'
import { strings } from './strings'

/* Constants ------------------------------------------------------------*/
const API_BASE = '/api/v3'

/* NotionAgent data structures ------------------------------------------*/

/**
 * Options of NotionAgent constructor
 * @typedef AgentOptions
 * @property {string} token - Login token (`token_v2` field in cookie)
 * @property {string} timezone - User's timezone
 * @property {string} locale - User's locale
 * @property {boolean} suppressWarning - Whether to hide warnings
 * @property {boolean} verbose - Whether to show status messages
 */
type AgentOptions = {
  token?: string
  timezone?: string
  locale?: string
  suppressWarning?: boolean
  verbose?: boolean
}

/**
 * A request object in getRecordValues' `requests` array
 * @typedef RecordRequest
 * @property {string} id - ID of a item
 * @property {string} table - The table to query
 */
type RecordRequest = {
  id: string
  table: string
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
type AggregateQuery = {
  id: string
  type: string
  property: string
  view_type: string
  aggregation_type: string
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
type DocumentOperation = {
  id: string
  table: string
  path: string[]
  command: string
  args: any[]
}



/* Notion.so data structures --------------------------------------------*/

/**
 * Error response from Notion.so
 * @typedef NotionError
 * @property {string} errorId
 * @property {string} name
 * @property {string} message
 * @property {string} status
 */
// type NotionError = {
//   errorId: string
//   name: string
//   message: string
//   status: string
// }



/* NotionAgent implementation -------------------------------------------*/

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
    verbose: true
  }) {
    this.token = opts.token || ''
    this.timezone = opts.timezone || 'Asia/Taipei'
    this.locale = opts.locale || 'en'
    this.suppressWarning = (typeof opts.suppressWarning === 'undefined')
      ? false : opts.suppressWarning
    this.verbose = (typeof opts.verbose === 'undefined')
      ? true : opts.verbose

    if (!this.suppressWarning && this.token.length === 0) {
      log(strings.NO_TOKEN_WARNING)
    }
  }



  /**
   * Execute a raw call to /api/v3/loadPageChunk
   * @param pageID - The page ID to request.
   * @param chunkNo - The chunk number to request.
   * @param cursor - The cursor.
   * @returns JSON object from response.
   */
  loadPageChunk(
    pageID: string,
    chunkNo: number = 0,
    cursor = { "stack": [] }
  ) {

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
   * @returns JSON object from response.
   */
  getAssetsJson() {

    const apiURL = API_BASE + '/getAssetsJson'

    const requestData = JSON.stringify({})

    return this.makeRequestToNotion(apiURL, requestData)

  } // getAssetsJson



  /**
   * Execute a raw call to /api/v3/getRecordValues
   * @param requests - The requests to make.
   * @returns JSON object from response.
   */
  getRecordValues(requests: RecordRequest[]) {

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
   * @returns JSON object from response.
   */
  loadUserContent() {

    const apiURL = API_BASE + '/loadUserContent'

    const requestData = JSON.stringify({})

    return this.makeRequestToNotion(apiURL, requestData)

  } // loadUserContent



  /**
   * Execute a raw call to /api/v3/queryCollection
   * @param collectionID
   * @param collectionViewID
   * @param aggregateQueries
   * @returns JSON object from response.
   */
  queryCollection(
    collectionID: string,
    collectionViewID: string,
    aggregateQueries: AggregateQuery[]
  ) {

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
   * @returns JSON object from response. Normally {}.
   */
  submitTransaction(operations: DocumentOperation[]) {

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
   * @returns JSON object from response.
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