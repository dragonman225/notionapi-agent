# notionapi-agent

![version](https://img.shields.io/npm/v/notionapi-agent.svg?style=flat-square&color=007acc&label=version) ![language](https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square) ![license](https://img.shields.io/github/license/dragonman225/notionapi-agent.svg?style=flat-square&label=license&color=08CE5D)

Unofficial Node.js API client for [Notion.so](https://www.notion.so).

> This is a work-in-progress project. If you need to use Notion's API in production, I recommend waiting for their official release.

## Documentation

* [Announcement](#Announcement)
* [Installation](#Installation)
* [Quickstart](#Quickstart)
* [Instance Options](#Instance-Options)
* [API Methods](#API-Methods)
* [Note](#Note)

## Announcement

When using v0.6.0+, import this library with

```javascript
const { NotionAgent } = require('notionapi-agent')
```

Instead of

```javascript
const NotionAgent = require('notionapi-agent')
```

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
const { NotionAgent } = require('notionapi-agent')

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
* `timeZone` - (optional) User's timezone, default: `Asia/Taipei`.
* `locale` - (optional) User's locale, default: `en`.
* `suppressWarning` - (optional) Whether to hide warnings, default: `false`.
* `verbose` - (optional) Whether to show status messages, default: `true`.

## API Methods

All methods return `Promise` that will resolve with the following object :

```javascript
{
  statusCode: Number // HTTP status code.
  data: Object // Object parsed from JSON response.
}
```

If raw response from Notion is not JSON, the `data` property will be an empty object.



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

## Note

### Project Structure

![project structure graph](report/deps_graph.svg)