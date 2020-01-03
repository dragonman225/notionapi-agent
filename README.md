# notionapi-agent

![version](https://img.shields.io/npm/v/notionapi-agent.svg?style=flat-square&color=007acc&label=version) ![language](https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square) ![license](https://img.shields.io/github/license/dragonman225/notionapi-agent.svg?style=flat-square&label=license&color=08CE5D)

Unofficial Node.js API client for [Notion.so](https://www.notion.so).

> ⚠ If you need to use Notion's API in production, I recommend waiting for their official release.

* [CHANGELOG](CHANGELOG.md)
* [API Documentation](https://notionapi.netlify.com/globals.html)

## Installation

```bash
npm install notionapi-agent
```

## Getting Started

### Basic Usage

[![Try notionapi-agent on RunKit](https://badge.runkitcdn.com/notionapi-agent.svg)](https://npm.runkit.com/notionapi-agent)

```typescript
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
```

The `result` is always the response of a successful request (HTTP status `200 OK`). If Notion responds with other status code or the request failed, an error is thrown.

### Advanced Usage

There is an [example](documentation/examples/download-page.ts) to demonstrate how to download all blocks of a page.

To access private content, one need the [token](documentation/get-token/get-token.md).

## Development

### Project Structure

![project structure graph](documentation/dependency-graph.svg)

### Documentation

Use [TypeStrong/typedoc](https://github.com/TypeStrong/typedoc) to generate reference documentation. It needs to be installed globally.

```bash
npm i -g typedoc
```

### Packaging

Use [rollup/rollup](https://github.com/rollup/rollup) to package multiple source files into one `cjs` module (`dist/index.js`) and one `esm` module (`dist/index.esm.js`). Use `tsc --emitDeclarationOnly` to generate TypeScript declaration files.