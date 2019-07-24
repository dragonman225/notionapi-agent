# notionapi-agent

Unofficial Node.js API client for [Notion.so](https://www.notion.so).

> This is a work-in-progress project. If you need to use Notion's API in production, I recommend waiting for their official release.

## Documentation

* [Installation](#Installation)
* [Quickstart](#Quickstart)
* [Instance Options](#Instance-Options)
* [API Methods](#API-Methods)

## Installation

```bash
# Install latest release from NPM registry.
npm i notionapi-agent
# Install master branch of git repo from Github.
npm i dragonman225/notionapi-agent
```

## Quickstart

An example script is included in the repository. See `test/agent.spec.js`.
Or you can take a look at the below code block.

```javascript
const fs = require('fs')
const NotionAgent = require('notionapi-agent')

/* Fill in your token. */
const options = {
  token: ''
}

const agent = new NotionAgent(options)

async function main() {
  try {
    /* Fill in a page id. */
    let pageId = ''
    let page = await agent.loadPageChunk(pageId)
    let assets = await agent.getAssetsJson()
    fs.writeFileSync(`PageChunk.json`, JSON.stringify(page.data), { encoding: 'utf-8' })
    fs.writeFileSync(`Assets.json`, JSON.stringify(assets.data), { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
```

The API requests are asynchronous and are implemented with `Promise`.

## Instance Options

* `token` - (optional) The Notion API token to access your private pages. If you only need to access public pages, this can be empty. Follow this [guide](docs/obtain_token.md) to obtain your token.
* `timeZone` - (optional) Default to `Asia/Taipei`.
* `locale` - (optional) Default to `en`.

## API Methods

All methods return `Promise` that will resolve with the following structure :

```javascript
{
  statusCode: Number // HTTP status code.
  data: Object // Object parsed from JSON response.
}
```

Note that if raw response from Notion is not JSON, the above `data` field will be an empty object.



### `loadPageChunk(pageID, chunkNo, cursor)`

Execute a raw call to `/api/v3/loadPageChunk`

* `pageID` - (required, String) A page ID, dashed version.
* `chunkNo` - (optional, Number, default: `0`)
* `cursor` - (optional, Object, default: `{ "stack": [] }`)

#### Returns : 

```javascript
{
  statusCode: Number // HTTP status code.
  data: Object // One chunk of the page.
}
```



### `getAssetsJson()`

Execute a raw call to `/api/v3/getAssetsJson`

* *(no parameter)*

#### Returns : 

```javascript
{
  statusCode: Number // HTTP status code.
  data: Object // Paths to all assets like images, scripts, etc.
}
```



### `getRecordValues(requests)`

Execute a raw call to /api/v3/getRecordValues

* `requests` - (required, Object) See below example.

  ```javascript
  [
    {
      "table": "block",
      "id": "cbf2b645-xxxx-xxxx-xxxx-xxxxe8cfed93"
    }
  ]
  ```

#### Returns : 

```javascript
{
  statusCode: Number // HTTP status code.
  data: Object // Content of requested blocks, collection_views, etc.
}
```



### `loadUserContent()`

Execute a raw call to /api/v3/loadUserContent

* *(no parameter)*

#### Returns : 

```javascript
{
  statusCode: Number // HTTP status code.
  data: Object // Everything about a user: identity information, settings.
}
```



### `queryCollection(collectionID, collectionViewID, aggregateQueries)`

Execute a raw call to /api/v3/queryCollection

* `collectionID` - (required, String) A collection ID.

* `collectionViewID` - (required, String) A collectionView ID.

* `aggregateQueries` - (required, Object) See below example.

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

#### Returns : 

```javascript
{
  statusCode: Number // HTTP status code.
  data: Object // Data in a collection.
}
```



### `submitTransaction(operations)`

Execute a raw call to /api/v3/submitTransaction

* `operations` - (required, Object) The operations to submit. See below for example.

  ```javascript
  [
    {
      "id":"cda54abd-xxxx-xxxx-xxxx-xxxx65c4a5e2",
      "table":"block",
      "path":["properties","title"],
      "command":"set",
      "args":[["test",[["h","yellow_background"]]]]
    }
  ]
  ```

#### Returns : 

```javascript
{
  statusCode: Number // HTTP status code.
  data: Object // Normally an empty object.
}
```