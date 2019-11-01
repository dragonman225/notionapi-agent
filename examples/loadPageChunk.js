const { NotionAgent } = require('notionapi-agent')

const agent = new NotionAgent()

async function main() {

  const pageId = '181e961a-eb5c-4ee6-9153-07c0dfd5156d'

  const page = await agent.loadPageChunk(pageId)
  if (page.error) {
    console.log('Error:\n', page.error)
  } else if (page.data) {
    console.log('Blocks:\n', page.data)
  }

}

main()