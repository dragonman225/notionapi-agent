module.exports = { log, parseJSON }

/**
 * Wrapper of console.log().
 */
function log() {
  console.log.apply(null, arguments)
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