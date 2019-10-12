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

### [2019.10.13]

I finished TypeScript definitions for all APIs exposed by this agent. Hope this will make development easier !

### [2019.10.08]

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

[JavaScript Example](https://github.com/dragonman225/notionapi-agent/blob/master/docs/example.js)

[TypeScript Example](https://github.com/dragonman225/notionapi-agent/blob/master/docs/example.ts)

You can also take a look at [the test script](https://github.com/dragonman225/notionapi-agent/blob/master/test/index.spec.ts).

## Instance Options

* `token` - (optional) The Notion API token to access your private pages. If you only need to access public pages, this can be empty. Follow this [guide](docs/obtain_token.md) to obtain your token.
* `timezone` - (optional) User's timezone, default: `Asia/Taipei`.
* `locale` - (optional) User's locale, default: `en`.
* `suppressWarning` - (optional) Whether to hide warnings, default: `false`.
* `verbose` - (optional) Whether to show status messages, default: `false`.

## API Methods

All methods return `Promise` that will resolve with the following object :

```javascript
{
  statusCode: Number // HTTP status code
  data: APIResponse // When HTTP status code is 200
      | ErrorResponse // When HTTP status code is not 200
}
```

* If raw response from Notion is not JSON, the `data` property will be an empty object.



### `loadPageChunk(pageID, chunkNo, cursor)`

Execute a raw call to `/api/v3/loadPageChunk`

* `pageID` - (required, String) A page ID, dashed version.
* `chunkNo` - (optional, Number, default: `0`)
* `cursor` - (optional, Object, default: `{ "stack": [] }`)

#### Returns : 

```javascript
{
  statusCode: Number // HTTP status code.
  data: LoadPageChunkResponse | ErrorResponse
}
```



### `getAssetsJson()`

Execute a raw call to `/api/v3/getAssetsJson`

* *(no parameter)*

#### Returns : 

```javascript
{
  statusCode: Number // HTTP status code.
  data: GetAssetsJsonResponse | ErrorResponse
}
```



### `getRecordValues(requests)`

Execute a raw call to /api/v3/getRecordValues

* `requests` - (required, Array of [RecordRequest](https://github.com/dragonman225/notionapi-agent/blob/6f1b8530179235b5949c83f591719231d481df9f/src/index.ts#L142)) See below example.

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
  data: GetRecordValuesResponse | ErrorResponse
}
```



### `loadUserContent()`

Execute a raw call to /api/v3/loadUserContent

* *(no parameter)*

#### Returns : 

```javascript
{
  statusCode: Number // HTTP status code.
  data: LoadUserContentResponse | ErrorResponse
}
```



### `queryCollection(collectionID, collectionViewID, aggregateQueries)`

Execute a raw call to /api/v3/queryCollection

* `collectionID` - (required, String) A collection ID.

* `collectionViewID` - (required, String) A collectionView ID.

* `aggregateQueries` - (required, Array of [AggregateQuery](https://github.com/dragonman225/notionapi-agent/blob/6f1b8530179235b5949c83f591719231d481df9f/src/index.ts#L421)) See below example.

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
  data: QueryCollectionResponse | ErrorResponse
}
```



### `submitTransaction(operations)`

Execute a raw call to /api/v3/submitTransaction

* `operations` - (required, Array of [DocumentOperation](https://github.com/dragonman225/notionapi-agent/blob/6f1b8530179235b5949c83f591719231d481df9f/src/index.ts#L156)) The operations to submit. See below for example.

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
  data: SubmitTransactionResponse | ErrorResponse
}
```

## Note

### Project Structure

![project structure graph](report/deps_graph.svg)