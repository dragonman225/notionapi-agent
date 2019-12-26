import * as fs from "fs"
import * as path from "path"
import { createAgent } from "../../"
import { Block } from "../../dist/interfaces/notion/models/block/"
import { Table } from "../../dist/interfaces/notion/models/common"

main()

async function main() {
  /**
   * https://www.notion.so/Writing-editing-guide-68c7c67047494fdb87d50185429df93e
   */
  const pageId = "68c7c670-4749-4fdb-87d5-0185429df93e"

  /** Create an API agent. */
  const notion = createAgent({ debug: true })

  // const page = await getPageContent(pageId, notion)

  let ctx = {
    start: true,
    childrenIds: [pageId],
    agent: notion
  }
  let page = {
    block: {}
  }
  while (ctx.childrenIds.length > 0) {
    console.log(`Start downloading next ${ctx.childrenIds.length} blocks.`)
    const life = await getChildrenBlocks2(ctx)
    ctx = life.nextCtx
    life.result.forEach(r => page.block[r.id] = r)
  }

  fs.writeFileSync(
    path.join(__dirname, `Page-${pageId}.json`),
    JSON.stringify(page),
    { encoding: "utf-8" }
  )
}

// async function getPageContent(
//   pageId: string, agent: ReturnType<typeof createAgent>
// ) {
//   let result = {
//     block: {},
//     collection: {},
//     collection_view: {},
//     file_ids: []
//   }

//   await getChildrenBlocks([pageId], result, agent, true)

//   return result
// }

// async function getChildrenBlocks(
//   childrenIds: string[], result,
//   agent: ReturnType<typeof createAgent>, start = false
// ) {
//   try {
//     const req = childrenIds.map(id => {
//       return { id, table: Table.Block }
//     })

//     const res = await agent.getRecordValues({
//       requests: req
//     })

//     let nextChildrenIds = []
//     res.results.forEach(record => {
//       if (record.role !== "none" && record.value) {
//         const block = record.value as Block

//         /** Store the record. */
//         result.block[block.id] = block

//         /** Collect ids of next batch of blocks. */
//         if (start || block.type !== "page" && block.content) {
//           nextChildrenIds = nextChildrenIds.concat(block.content as any)
//         }
//       }
//     })

//     if (nextChildrenIds.length > 0)
//       await getChildrenBlocks(nextChildrenIds, result, agent)
//   } catch (error) {
//     throw error
//   }
// }

type Context = {
  start: boolean
  childrenIds: string[]
  agent: ReturnType<typeof createAgent>
}

type Life = {
  result: Block[]
  nextCtx: Context
}

async function getChildrenBlocks2(ctx: Context): Promise<Life> {

  const req = ctx.childrenIds.map(id => {
    return { id, table: Table.Block }
  })

  const res = await ctx.agent.getRecordValues({
    requests: req
  })

  const result = res.results
    .filter(r => r.role !== "none")
    .map(r => r.value) as Block[]

  const nextCtx = {
    start: false,
    childrenIds: result
      .reduce((childrenIds, block) => {
        if (ctx.start || block.type !== "page" && block.content) {
          return childrenIds.concat(block.content as any)
        } else {
          return childrenIds
        }
      }, []),
    agent: ctx.agent
  }

  return { nextCtx, result }
}