import * as fs from 'fs'
import * as path from 'path'
import { NotionAgent, LoadPageChunkResponse, NotionError, GetAssetsJsonResponse } from '../src'

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
    if (page.statusCode === 200) {
      page.data = page.data as LoadPageChunkResponse
      console.log(`Blocks: ${page.data.recordMap.block}\n`)
    } else {
      page.data = page.data as NotionError
      console.log(`Error: ${page.data.message}\n`)
    }

    console.log('Calling getAssetsJson')
    let assets = await agent.getAssetsJson()
    console.log(`Remote response ${assets.statusCode}`)
    if (page.statusCode === 200) {
      assets.data = assets.data as GetAssetsJsonResponse
      console.log(`Blocks: ${assets.data.version}\n`)
    } else {
      assets.data = assets.data as NotionError
      console.log(`Error: ${assets.data.message}\n`)
    }

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
