const assert = require('assert')
const makeRequest = require('./make-request')
const { log } = require('./utils')
const strings = require('./strings')

module.exports = NotionAgent

function NotionAgent(options) {

  assert(options.cookie, strings.AGENT_CONSTRUCT_FAIL)

  const cookie = options.cookie
  const pathBase = '/api/v3/'
  const agentOptions = {
    hostname: 'www.notion.so',
    port: 443,
    path: '',
    method: 'POST',
    authority: 'www.notion.so',
    headers: {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'accept-encoding': 'gzip, deflate',
      'content-length': 0,
      'content-type': 'application/json',
      'cookie': cookie,
      'origin': 'https://www.notion.so',
      'referer': 'https://www.notion.so',
      'user-agent': strings.REQUEST_USER_AGENT
    }
  }

  /**
   * API: /api/v3/loadPageChunk
   * @param {string} pageId - The page id to request.
   * @returns {Promise.<object>} JSON object from response.
   */
  this.loadPageChunk = async (pageId) => {

    assert(pageId, strings.PAGEID_NOT_FOUND)

    const api = 'loadPageChunk'
    log(`Sending request: ${api}`)

    const requestData = JSON.stringify({
      "pageId": pageId,
      "limit": 50,
      "cursor": { "stack": [] },
      "chunkNumber": 0,
      "verticalColumns": false
    })

    Object.defineProperty(
      agentOptions,
      'path',
      { writable: true, value: pathBase + api }
    )

    Object.defineProperty(
      agentOptions.headers,
      'content-length',
      { writable: true, value: requestData.length }
    )

    return await makeRequest(agentOptions, requestData)

  }

  /**
   * API: /api/v3/getAssetsJson
   * @returns {Promise.<object>} JSON object from response.
   */
  this.getAssetsJson = async () => {

    const api = 'getAssetsJson'
    log(`Sending request: ${api}`)

    const requestData = JSON.stringify({})

    Object.defineProperty(
      agentOptions,
      'path',
      { writable: true, value: pathBase + api }
    )

    Object.defineProperty(
      agentOptions.headers,
      'content-length',
      { writable: true, value: requestData.length }
    )

    return await makeRequest(agentOptions, requestData)

  }

}