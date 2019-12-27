import * as fs from "fs"
import * as path from "path"
import { createAgent } from "../../dist"
import { Block, Table } from "../../dist/interfaces/notion-models"

main()

async function main() {
  /**
   * https://www.notion.so/Writing-editing-guide-68c7c67047494fdb87d50185429df93e
   */
  const pageId = "68c7c670-4749-4fdb-87d5-0185429df93e"

  /** Create an API agent. */
  const notion = createAgent({ debug: true })

  /** Set initial state. */
  let state: GetBlocksState = {
    initial: true,
    blockIds: [pageId],
    agent: notion
  }

  /** A variable to store content. */
  let content = {
    block: {}
  }

  /** Keep traversing until there're no more children blocks. */
  while (state.blockIds.length > 0) {
    console.log(`Start downloading next ${state.blockIds.length} blocks.`)
    const [blocks, nextState] = await getBlocks(state)
    blocks.forEach(r => content.block[r.id] = r)
    state = nextState
  }

  /** Save content to file. */
  fs.writeFileSync(
    path.join(__dirname, `Page-${pageId}.json`),
    JSON.stringify(content),
    { encoding: "utf-8" }
  )
}

type GetBlocksState = {
  /** Whether this is the initial state. */
  initial: boolean
  /** Ids of blocks to get. */
  blockIds: string[]
  /** A compatible API agent. */
  agent: ReturnType<typeof createAgent>
}

/**
 * Get blocks by ids.
 * @param state 
 */
async function getBlocks(
  state: GetBlocksState
): Promise<[Block[], GetBlocksState]> {

  const req = state.blockIds.map(id => {
    return { id, table: "block" as Table }
  })

  const res = await state.agent.getRecordValues({
    requests: req
  })

  const validBlocks = res.results
    .filter(r => r.role !== "none")
    .map(r => r.value as Block)

  const nextState = {
    initial: false,
    blockIds: validBlocks
      .reduce((childrenIds: string[], block) => {
        if ((state.initial || block.type !== "page") && block.content) {
          return childrenIds.concat(block.content)
        } else {
          return childrenIds
        }
      }, []),
    agent: state.agent
  }

  return [validBlocks, nextState]
}