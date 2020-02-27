import * as fs from "fs"
import * as path from "path"
import { createAgent } from "../src"

const consoleCfg = {
  maxArrayLength: 5
}

const agent = createAgent({ debug: true })

function saveData(filename, obj) {
  const file = path.join(__dirname, filename)
  fs.writeFileSync(file, JSON.stringify(obj), { encoding: "utf-8" })
}

async function main() {
  const testPageId = "181e961a-eb5c-4ee6-9153-07c0dfd5156d"
  const testCollectionId = "57d27a94-610a-4266-9441-7da3b7e976ff"
  const testCollectionViewId = "1529a5d4-d982-4767-92b4-96e93ec2ef0c"

  /** getActivityLog */
  try {
    const activity = await agent.getActivityLog({
      limit: 5,
      navigableBlockId: testPageId,
      spaceId: ""
    })

    console.dir(activity, consoleCfg)
    saveData("getActivityLog.json", activity)
  } catch (error) {
    console.log(error)
  }

  /** getAssetsJson */
  try {
    const assets = await agent.getAssetsJson({})

    console.dir(assets, consoleCfg)
    saveData("getAssetsJson.json", assets)
  } catch (error) {
    console.log(error)
  }

  /** getRecordValues */
  try {
    const record = await agent.getRecordValues({
      requests: [{ id: testPageId, table: "block" }]
    })

    console.dir(record, consoleCfg)
    saveData("getRecordValues.json", record)
  } catch (error) {
    console.log(error)
  }

  /** getSnapshotsList */
  try {
    const snapshotsList = await agent.getSnapshotsList({
      blockId: testPageId,
      size: 50
    })

    console.dir(snapshotsList, consoleCfg)
    saveData("getSnapshotsList.json", snapshotsList)
  } catch (error) {
    console.log(error)
  }

  /** getSharedPages */
  try {
    const sharedPages = await agent.getUserSharedPages({
      includeDeleted: true
    })

    console.dir(sharedPages, consoleCfg)
    saveData("getUserSharedPages.json", sharedPages)
  } catch (error) {
    console.log(error)
  }

  /** loadPageChunk */
  try {
    const chunk = await agent.loadPageChunk({
      pageId: testPageId,
      limit: 50,
      chunkNumber: 0,
      cursor: { stack: [] },
      verticalColumns: false
    })

    console.dir(chunk, consoleCfg)
    saveData("loadPageChunk.json", chunk)
  } catch (error) {
    console.log(error)
  }

  /** loadUserContent */
  try {
    const userContent = await agent.loadUserContent({})

    console.dir(userContent, consoleCfg)
    saveData("loadUserContent.json", userContent)
  } catch (error) {
    console.log(error)
  }

  /** queryCollection */
  try {
    const collection = await agent.queryCollection({
      collectionId: testCollectionId,
      collectionViewId: testCollectionViewId,
      loader: {
        limit: 100,
        loadContentCover: false,
        type: "table",
        userLocale: "en",
        userTimeZone: "Asia/Taipei"
      },
      query: {
        aggregate: [],
        aggregations: [],
        filter: {
          filters: [],
          operator: "and"
        },
        sort: []
      }
    })

    console.dir(collection, consoleCfg)
    saveData("queryCollection.json", collection)
  } catch (error) {
    console.log(error)
  }
} // main

main()