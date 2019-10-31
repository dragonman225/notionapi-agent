import * as fs from 'fs'
import * as path from 'path'
import { NotionAgent } from '../src'

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
    if (page.error) {
      console.log(`Error: ${page.error.message}\n`)
    } else if (page.data) {
      console.log(`Blocks: ${page.data.recordMap.block}\n`)
    }

    console.log('Calling getAssetsJson')
    let assets = await agent.getAssetsJson()
    if (assets.error) {
      console.log(`Error: ${assets.error.message}\n`)
    } else if (assets.data) {
      console.log(`Version: ${assets.data.version}\n`)
    }

    console.log('Calling loadUserContent')
    let userContent = await agent.loadUserContent()
    if (userContent.error) {
      console.log(`Error: ${userContent.error.message}\n`)
    } else if (userContent.data) {
      console.log(`Error: ${userContent.data.recordMap.notion_user}\n`)
    }

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
