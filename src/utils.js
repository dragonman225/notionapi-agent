module.exports = { log }

/**
 * Wrapper of console.log().
 */
function log() {
  console.log.apply(null, arguments)
}