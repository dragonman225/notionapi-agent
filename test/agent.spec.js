const fs = require('fs')
const path = require('path')
const NotionAgent = require('../lib/agent')

/* Fill in your token. */
const options = {
  token: ''
}

const agent = new NotionAgent(options)

async function main() {
  try {
    /* Fill in a page id. */
    let pageId = '181e961a-eb5c-4ee6-9153-07c0dfd5156d'

    console.log('Calling loadPageChunk')
    let page = await agent.loadPageChunk(pageId)
    console.log(`Remote response ${page.statusCode}`)

    console.log('Calling getAssetsJson')
    let assets = await agent.getAssetsJson()
    console.log(`Remote response ${assets.statusCode}`)

    console.log('Calling loadUserContent')
    let userContent = await agent.loadUserContent()
    console.log(`Remote response ${userContent.statusCode}`)

    /** Save response data. */
    let pageChunkFile = path.join(__dirname, 'PageChunk.json')
    let assetsFile = path.join(__dirname, 'Assets.json')
    let userContentFile = path.join(__dirname, 'UserContent.json')
    fs.writeFileSync(pageChunkFile, JSON.stringify(page.data), { encoding: 'utf-8' })
    fs.writeFileSync(assetsFile, JSON.stringify(assets.data), { encoding: 'utf-8' })
    fs.writeFileSync(userContentFile, JSON.stringify(userContent.data), { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
