# notionapi

> This is an unofficial API client in Javascript for [Notion](https://www.notion.so).
>
> Currently in a very early stage, with only a few read operations.
>
> The library is meant to provide a basic abstraction, so all returned data are unaltered JSON objects from Notion.

## Documentation

* [Installation](#Installation)
* [Usage](#Usage)
* [API Methods](#API Methods)

## Installation

```bash
git clone https://github.com/dragonman225/notionapi.git
```

## Usage

An example script is included in the repository. See `index.js`.
Or you can take a look at the below code block.

```javascript
const fs = require('fs')
const NotionAgent = require('./src/agent')

/* Fill in your cookie. */
const options = {
  cookie: ''
}

const agent = new NotionAgent(options)

async function main() {
  try {
    /* Fill in a page id. */
    let pageId = ''
    let page = await agent.loadPageChunk(pageId)
    let assets = await agent.getAssetsJson()
    fs.writeFileSync(`PageChunk_${pageId}.json`, JSON.stringify(page), { encoding: 'utf-8' })
    fs.writeFileSync(`Assets.json`, JSON.stringify(assets), { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
```

The API requests are asynchronous, and I wrapped them with `Promise`, so you can use `async` / `await` to interact with them.

## API Methods

### `loadPageChunk(pageId)`

Get a page with its ID. A wrapper for `/api/v3/loadPageChunk`.

* `pageId` : (required)

#### Returns : 

Unaltered JSON object from Notion.

### `getAssetsJson()`

Get all assets of current user. A wrapper for `/api/v3/getAssetsJson`.

* *(no parameter)*

#### Returns : 

Unaltered JSON object from Notion.