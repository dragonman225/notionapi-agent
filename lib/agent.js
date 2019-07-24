const assert = require('assert')
const { makeHTTPSRequest } = require('@dnpr/make-request')
const { log, parseJSON } = require('./utils')
const strings = require('./strings')

/**
 * @typedef APIResponse
 * @property {number} statusCode - HTTP status code.
 * @property {*} data - Response data object.
 */

module.exports = NotionAgent

function NotionAgent(options = {}) {

  const token = options.token || ''
  const timeZone = options.timeZone || 'Asia/Taipei'
  const locale = options.locale || 'en'
  const pathBase = '/api/v3/'

  if (token.length === 0) {
    log(`[WARNING] ${strings.NO_TOKEN_WARNING}`)
  }

  /**
   * Make a request to Notion API.
   * @param {string} apiURL - Notion API URL.
   * @param {string} requestData - Request body.
   * @returns {Promise.<APIResponse>} JSON object from response.
   */
  async function makeRequestToNotion(apiURL, requestData) {

    /* Options passed to https.request(). */
    const agentOptions = {
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
        'cookie': `token_v2=${token}`,
        'origin': 'https://www.notion.so',
        'referer': 'https://www.notion.so',
        'user-agent': strings.REQUEST_USER_AGENT
      }
    }

    let res = await makeHTTPSRequest(agentOptions, requestData)
    let resParsed = {
      statusCode: res.statusCode,
      data: parseJSON(res.responseBuffer)
    }

    return resParsed

  }

  /**
   * Execute a raw call to /api/v3/loadPageChunk
   * @param {string} pageID - The page ID to request.
   * @param {number} chunkNo - The chunk number to request.
   * @param {object} cursor - The cursor.
   * @returns {Promise.<APIResponse>} JSON object from response.
   */
  this.loadPageChunk = (pageID, chunkNo, cursor) => {

    assert(pageID, strings.PAGEID_NOT_FOUND)

    const apiURL = pathBase + 'loadPageChunk'

    const requestData = JSON.stringify({
      "pageId": pageID,
      "limit": cursor ? 30 : 50,
      "cursor": cursor ? cursor : { "stack": [] },
      "chunkNumber": chunkNo ? chunkNo : 0,
      "verticalColumns": false
    })

    return makeRequestToNotion(apiURL, requestData)

  }

  /**
   * Execute a raw call to /api/v3/getAssetsJson
   * @returns {Promise.<APIResponse>} JSON object from response.
   */
  this.getAssetsJson = () => {

    const apiURL = pathBase + 'getAssetsJson'

    const requestData = JSON.stringify({})

    return makeRequestToNotion(apiURL, requestData)

  }

  /**
   * A request object in the requests array for getRecordValues.
   * @typedef {object} RecordRequest
   * @property {string} table - The table to query.
   * @property {string} id - ID of a item.
   */

  /**
   * Execute a raw call to /api/v3/getRecordValues
   * @param {RecordRequest[]} requests - The requests to make.
   * @returns {Promise.<APIResponse>} JSON object from response.
   */
  this.getRecordValues = (requests) => {

    assert(Array.isArray(requests), strings.IDS_NOT_ARRAY)

    const apiURL = pathBase + 'getRecordValues'

    const requestData = JSON.stringify({
      "requests": requests.map((request) => {
        return {
          "table": request.table,
          "id": request.id
        }
      })
    })

    return makeRequestToNotion(apiURL, requestData)

  }

  /**
   * Execute a raw call to /api/v3/loadUserContent
   * @returns {Promise.<APIResponse>} JSON object from response.
   */
  this.loadUserContent = () => {

    const apiURL = pathBase + 'loadUserContent'

    const requestData = JSON.stringify({})

    return makeRequestToNotion(apiURL, requestData)

  }

  /**
   * An aggregate query.
   * @typedef AggregateQuery
   * @property {string} id
   * @property {string} type
   * @property {string} property
   * @property {string} view_type
   * @property {string} aggregation_type
   */

  /**
   * Info of a user.
   * @typedef User
   * @property {string} timeZone
   * @property {string} locale
   */

  /**
   * Execute a raw call to /api/v3/queryCollection
   * @param {string} collectionID
   * @param {string} collectionViewID
   * @param {AggregateQuery[]} aggregateQueries
   * @returns {Promise.<APIResponse>} JSON object from response.
   */
  this.queryCollection = (collectionID, collectionViewID, aggregateQueries) => {

    assert(collectionID, strings.COLLECTION_ID_NOT_FOUND)
    assert(collectionViewID, strings.COLLECTION_VIEW_ID_NOT_FOUND)
    assert(Array.isArray(aggregateQueries), strings.AGGREGATEQUERIES_NOT_ARRAY)

    const apiURL = pathBase + 'queryCollection'

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
        "limit": 70,
        "userTimeZone": timeZone,
        "userLocale": locale,
        "loadContentCover": true
      }
    })

    return makeRequestToNotion(apiURL, requestData)

  }

  /**
   * An operation to Notion document.
   * @typedef Operation
   * @property {string} id - The ID of the block where the operation apply.
   * @property {string} table - Usually "block".
   * @property {string[]} path - Property path relative to the block itself.
   * @property {string} command - The operation type. e.g. "set", "update".
   * @property {any[]} args - The arguments of the command.
   */

  /**
   * Execute a raw call to /api/v3/submitTransaction
   * @param {Operation[]} operations
   * @returns {Promise.<APIResponse>} JSON object from response. Normally {}.
   */
  this.submitTransaction = (operations) => {

    assert(Array.isArray(operations))
    operations.forEach(operation => {
      assert(operation.id)
      assert(operation.table)
      assert(operation.path)
      assert(operation.command)
      assert(operation.args)
    })

    const apiURL = pathBase + 'submitTransaction'

    const requestData = JSON.stringify({
      "operations": operations
    })

    return makeRequestToNotion(apiURL, requestData)

  }

}