import * as fs from 'fs'
import * as path from 'path'
import { createAgent } from '../src'

const agent = createAgent({ debug: true })

function saveData(filename, obj) {
  const file = path.join(__dirname, filename)
  fs.writeFileSync(file, JSON.stringify(obj), { encoding: "utf-8" })
}

async function main() {
  const testPageId = "181e961a-eb5c-4ee6-9153-07c0dfd5156d"
  const testCollectionId = "57d27a94-610a-4266-9441-7da3b7e976ff"
  const testCollectionViewId = "1529a5d4-d982-4767-92b4-96e93ec2ef0c"

  /** getRecordValues */
  try {
    const record = await agent.getRecordValues({
      requests: [{ id: testPageId, table: "block" }]
    })

    console.log(record)
    saveData("getRecordValues.json", record)
  } catch (error) {
    console.log(error)
  }

  /** getSharedPages */
  try {
    const sharedPages = await agent.getUserSharedPages({
      includeDeleted: true
    })

    console.log(sharedPages)
    saveData("getUserSharedPages.json", sharedPages)
  } catch (error) {
    console.log(error)
  }

  /** loadUserContent */
  try {
    const userContent = await agent.loadUserContent({})

    console.log(userContent)
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
        filter: [],
        filter_operator: "and",
        sort: []
      }
    })

    console.log(collection)
    saveData("queryCollection.json", collection)
  } catch (error) {
    console.log(error)
  }
} // main

main()
