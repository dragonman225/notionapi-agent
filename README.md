# notionapi-agent

![version](https://img.shields.io/npm/v/notionapi-agent.svg?style=flat-square&color=007acc&label=version) ![language](https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square) ![license](https://img.shields.io/github/license/dragonman225/notionapi-agent.svg?style=flat-square&label=license&color=08CE5D)

Unofficial Node.js API client for [Notion.so](https://www.notion.so).

> :warning: If you need to use Notion's API in production, I recommend waiting for their official release.

* [CHANGELOG](CHANGELOG.md)
* [API Documentation](https://notionapi-develop.netlify.com/globals.html)

## Installation

```bash
npm install notionapi-agent
```

## Getting Started

### Basic Usage

```typescript
const { createAgent } = require('notionapi-agent')

const agent = createAgent()

async function main() {

  const pageId = '181e961a-eb5c-4ee6-9153-07c0dfd5156d'

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
```

The `result` is always the response of a successful request (HTTP status `200 OK`). If Notion responds with other status code or the request failed, an error is thrown.

### Advanced Usage

There is an [example](documentation/examples/download-page.ts) to download all blocks of a page.

## Development

### Project Structure

![project structure graph](documentation/dependency-graph.svg)

### External Dependencies

* [TypeStrong/typedoc](https://github.com/TypeStrong/typedoc)

  ```bash
  npm i -g typedoc
  ```