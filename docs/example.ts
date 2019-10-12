import { NotionAgent, GetAssetsJsonResponse, ErrorResponse } from '..'

/* Fill in your token. */
const options = {
  token: ''
}

const agent = new NotionAgent(options)

async function main() {
  try {
    const res = await agent.getAssetsJson()
    if (res.statusCode === 200) {
      res.data = res.data as GetAssetsJsonResponse
      console.log(`Version: ${res.data.version}`)
    } else {
      res.data = res.data as ErrorResponse
      console.log(`Error: ${res.data.message}`)
    }
  } catch (error) {
    console.error(error)
  }
}

main()