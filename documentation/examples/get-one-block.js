const { createAgent } = require("notionapi-agent")

const blockId = "181e961a-eb5c-4ee6-9153-07c0dfd5156d"

getBlock(blockId)

async function getBlock(id) {

  const agent = createAgent()

  try {
    const result = await agent.getRecordValues({
      requests: [{ id, table: "block" }]
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }

}