# notionapi-agent

![version](https://img.shields.io/npm/v/notionapi-agent.svg?style=flat-square&color=007acc&label=version) ![language](https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square) ![license](https://img.shields.io/github/license/dragonman225/notionapi-agent.svg?style=flat-square&label=license&color=08CE5D)

Unofficial Node.js API client for [Notion.so](https://www.notion.so).

> :warning: This is a work-in-progress project. If you need to use Notion's API in production, I recommend waiting for their official release.

* [CHANGELOG](CHANGELOG.md)

## Installation

```bash
npm install notionapi-agent
```

## Getting Started

[![Try notionapi-agent on RunKit](https://badge.runkitcdn.com/notionapi-agent.svg)](https://npm.runkit.com/notionapi-agent)

```typescript
const { NotionAgent } = require('notionapi-agent')

const agent = new NotionAgent()

async function main() {

  let pageId = '181e961a-eb5c-4ee6-9153-07c0dfd5156d'

  let page = await agent.loadPageChunk(pageId)
  if (page.error) {
    console.log(`Error:\n`, page.error)
  } else if (page.data) {
    console.log(`Blocks:\n`, page.data)
  }

}

main()
```

See more API in [documentation](https://notionapi-develop.netlify.com/globals.html#createagent).

## Development

### Project Structure

![project structure graph](documentation/dependency-graph.svg)

### External Dependencies

* [TypeStrong/typedoc](https://github.com/TypeStrong/typedoc)

  ```bash
  npm i -g typedoc
  ```