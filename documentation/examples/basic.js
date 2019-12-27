const { createAgent } = require("notionapi-agent")

const agent = createAgent()

async function main() {

  const pageId = "181e961a-eb5c-4ee6-9153-07c0dfd5156d"

  try {
    const result = await agent.getRecordValues({
      requests: [{ id: pageId, table: "block" }]
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }

}

main()