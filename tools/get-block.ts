import * as fs from "fs"
import * as path from "path"
import { parseArgv } from "@dnpr/cli"

import { createAgent } from "../src"

const agent = createAgent({ debug: true })

function saveData(filename, obj) {
  const file = path.join(__dirname, filename)
  fs.writeFileSync(file, JSON.stringify(obj), { encoding: "utf-8" })
}

async function main() {
  const { args } = parseArgv(process.argv)
  const blockId = args[0]

  try {
    const record = await agent.getRecordValues({
      requests: [{ id: blockId, table: "block" }]
    })

    console.dir(record, { depth: 999 })
    saveData(`get-block-${blockId}.json`, record)
  } catch (error) {
    console.log(error)
  }
}

main()