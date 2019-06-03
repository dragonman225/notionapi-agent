const https = require('https')
const zlib = require('zlib')
const { log } = require('./utils')

module.exports = makeRequest

/**
 * Send a https request and get the response.
 * @param {Object} options - Options passed to https.request().
 * @param {*} payload - Request body.
 * @returns {Promise.<*>} Response from remote.
 */
function makeRequest(options, payload) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {

      log(`Remote response with statusCode: ${res.statusCode}`)

      /**
       * zlib accepts Buffer, not string, so we need to collect chucks in an array,
       * and use Buffer.concat() to combine them.
       */
      let data = []
      let encoding = res.headers['content-encoding']

      /**
       * If no compression is used.
       */
      if (encoding === 'undefined') {
        res.setEncoding('utf-8')
      }

      /**
       * On data chuck received.
       */
      res.on('data', (chunk) => {
        data.push(chunk)
      })

      /**
       * On response end.
       */
      res.on('end', () => {
        let buffer = Buffer.concat(data)
        if (encoding === 'gzip') {
          buffer = zlib.gunzipSync(buffer)
        } else if (encoding === 'deflate') {
          buffer = zlib.inflateSync(buffer)
        }
        buffer = parseJSON(buffer)
        resolve(buffer)
      })

    })

    /**
     * On request error.
     */
    req.on('error', (error) => {
      reject(error)
    })

    /**
     * Write the payload.
     */
    req.write(payload)
    req.end()
  })
}

/**
 * Failsafe JSON.parse() wrapper.
 * @param {*} str - Payload to parse.
 * @returns {Object} Parsed object when success, undefined when fail.
 */
function parseJSON(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    return void 0
  }
}