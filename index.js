const fs = require('fs')
const NotionAgent = require('./src/agent')

/* Fill in your cookie. */
const options = {
  cookie: ''
}

const agent = new NotionAgent(options)

async function main() {
  try {
    /* Fill in a page id. */
    let pageId = ''
    let page = await agent.loadPageChunk(pageId)
    let assets = await agent.getAssetsJson()
    fs.writeFileSync(`PageChunk_${pageId}.json`, JSON.stringify(page), { encoding: 'utf-8' })
    fs.writeFileSync(`Assets.json`, JSON.stringify(assets), { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
