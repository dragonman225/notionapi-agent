const { NotionAgent } = require('..')

/* Fill in your token. */
const options = {
  token: ''
}

const agent = new NotionAgent(options)

async function main() {
  try {
    const res = await agent.getAssetsJson()
    if (res.statusCode === 200) {
      console.log(`Version: ${res.data.version}`)
    } else {
      console.log(`Error: ${res.data.message}`)
    }
  } catch (error) {
    console.error(error)
  }
}

main()