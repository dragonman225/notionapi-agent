# notionapi

> This is an unofficial Javascript API client for [Notion](https://www.notion.so).
>
> Currently in a very early stage, with only a few read operations.
>
> The library is meant to provide a basic abstraction, so all returned data are unaltered JSON objects from Notion.

## Documentation

* [Installation](#Installation)
* [Usage](#Usage)
* [API Methods](#API-Methods)

## Installation

```bash
# Clone the repository
git clone https://github.com/dragonman225/notionapi.git
# Or, install as a dependency. Then, you can use "require('notionapi')".
npm install dragonman225/notionapi
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
    fs.writeFileSync(`PageChunk.json`, JSON.stringify(page), { encoding: 'utf-8' })
    fs.writeFileSync(`Assets.json`, JSON.stringify(assets), { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
```

The API requests are asynchronous, and I wrapped them with `Promise`, so you can use `async` / `await` to interact with them.

## API Methods

After creating an instance of `NotionAgent` by `new NotionAgent(options)`, you can use the following methods in `NotionAgent`.



### `loadPageChunk(pageID, chunkNo, cursor)`

Execute a raw call to `/api/v3/loadPageChunk`

* `pageId` - (required) An ID string.
* `chunkNo` - (optional, default: `0`)
* `cursor` - (optional, default: `{ "stack": [] }`)

#### Returns : 

One chunk of a page.



### `getAssetsJson()`

Execute a raw call to `/api/v3/getAssetsJson`

* *(no parameter)*

#### Returns : 

Paths to all assets like images, scripts, etc.



### `getRecordValues(requests)`

Execute a raw call to /api/v3/getRecordValues

* `requests` - (required) See below example.

  ```javascript
  [
    {
      "table": "block",
      "id": "cbf2b645-ffff-ffff-ffff-f851e8cfed93"
    }
  ]
  ```


#### Returns : 

Content of requested blocks, collection_views, etc.



### `loadUserContent()`

Execute a raw call to /api/v3/loadUserContent

* *(no parameter)*

#### Returns : 

Everything about a user : identity information, settings.



### `queryCollection(collectionID, collectionViewID, aggregateQueries, user)`

Execute a raw call to /api/v3/queryCollection

* `collectionID` - (required) An ID string.

* `collectionViewID` - (required) An ID string.

* `aggregateQueries` - (required) See below example.

  ```javascript
  [
    {
      "id":"count",
      "type":"title",
      "property":"title",
      "view_type":"table",
      "aggregation_type":"not_empty"
    }
  ]
  ```

* `user` - (required) See below example.

  ```javascript
  {
    timeZone: "Asia/Taipei",
    locale: 'en'
  }
  ```

#### Returns : 

Data in a collection.