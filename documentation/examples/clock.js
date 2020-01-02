const uuid = require("uuid/v4")
const { createAgent } = require("notionapi-agent")

const clockBlockId = ""

runClock(clockBlockId)

/**
 * Trun a Notion block into a clock.
 */
async function runClock(blockId) {

  const agent = createAgent({ debug: true })

  while (true) {
    await sleep(1000) // A blocking delay to avoid overloading the API.
    try {
      await agent.submitTransaction({
        requestId: uuid(),
        transactions: [
          {
            id: uuid(),
            operations: [
              {
                id: blockId,
                table: "block",
                path: ["properties", "title"],
                command: "set",
                args: [ // SemanticString[]
                  [
                    getTime(), // Content
                    [["b"], ["h", "purple"]] // BasicStringFormatting[]
                  ] // SemanticString
                ]
              }
            ]
          }
        ]
      })
    } catch (error) {
      continue
    }
  }
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function getTime() {
  return new Date().toTimeString()
}