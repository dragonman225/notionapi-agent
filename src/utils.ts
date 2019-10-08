/**
 * Wrapper of console.log().
 */
function log(..._arguments: any[]) {
  let args = Array.from(_arguments)
  args.unshift('(notionapi-agent)')
  console.log.apply(null, args as [])
}

/**
 * Failsafe JSON.parse() wrapper.
 * @param str - Payload to parse.
 * @returns Parsed object when success, undefined when fail.
 */
function parseJSON(str: string) {
  try {
    return JSON.parse(str)
  } catch (error) {
    return void 0
  }
}

export { log, parseJSON }