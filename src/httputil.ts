/** Import libraries. */
const URL = (typeof window !== "undefined" && window.URL) ?
  window.URL : require("url").URL
import { makeHTTPRequest, makeHTTPSRequest } from "@dnpr/make-request"

/** Import other sripts. */
import { log } from "./log"
import { RequestError } from "./error/RequestError"

/**
 * @category Library Internal
 */
function post(url: string) {

  const myURL = new URL(url)

  if (myURL.protocol !== "http:" && myURL.protocol !== "https:") {
    throw new RequestError(`Unsupported protocol: ${myURL.protocol}`)
  }

  const port = myURL.port
    ? myURL.port : (myURL.protocol === "http:")
      ? 80 : 443

  const agentOptions = {
    hostname: myURL.hostname,
    authority: myURL.hostname,
    port: port,
    path: myURL.pathname + myURL.search,
    method: "POST",
    headers: {}
  }

  return {
    setHeader: function (key: string, value: string) {
      agentOptions.headers[key] = value
      return this
    },
    sendAsJson: async function (body?: any) {

      log.debug(
        `http-util.ts: ${agentOptions.method} ${agentOptions.hostname} \
${agentOptions.port} ${agentOptions.path}`)

      /** @dnpr/make-request only support these two. */
      this.setHeader("accept-encoding", "gzip, deflate")
      this.setHeader("content-type", "application/json")

      let payload = ""

      try {
        if (body) payload = JSON.stringify(body)
      } catch (error) {
        throw error
      }

      let response

      try {
        if (myURL.protocol === "http:") {
          response = await makeHTTPRequest(agentOptions, payload)
        } else {
          response = await makeHTTPSRequest(agentOptions, payload)
        }
      } catch (error) {
        throw error
      }

      try {
        return JSON.parse(response.responseBuffer)
      } catch (error) {
        throw error
      }

    } // send
  } // return

} // post

export { post }