# notionapi-agent

> This is an unofficial Javascript API client for [Notion.so](https://www.notion.so).
>
> Currently some essential read APIs and one write API are included.
>
> The library is meant to provide a basic abstraction, so all returned data are unaltered JSON objects from Notion.

## Documentation

* [Installation](#Installation)
* [Quickstart](#Quickstart)
* [Instance Options](#Instance-Options)
* [API Methods](#API-Methods)

## Installation

```bash
# Install master branch of git repo from Github.
npm i dragonman225/notionapi-agent
# Install latest release from NPM registry
npm i notionapi-agent
```

## Quickstart

An example script is included in the repository. See `test/agent.spec.js`.
Or you can take a look at the below code block.

```javascript
const fs = require('fs')
const NotionAgent = require('notionapi-agent')

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
    fs.writeFileSync(`PageChunk.json`, JSON.stringify(page.data), { encoding: 'utf-8' })
    fs.writeFileSync(`Assets.json`, JSON.stringify(assets.data), { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
```

The API requests are asynchronous, and I wrapped them with `Promise`, so you can use `async` / `await` to interact with them.

## Instance Options

* `cookie` - (optional) Your cookie. You can obtain that with a browser: Open devtool, switch to **Network** tab, reload page, find a request whose **Request URL** contains `https://www.notion.so/api/v3/`, look at its **Request Headers** section, you will find **cookie**.
  * When cookie is not provided, only data of public pages can be get, and only partial API works.
  * **The library only sents the cookie to `www.notion.so:443`**, refer to `lib/agent.js` for details.
  * It may be possible to use only `token_v2` of the cookie to authenticate,  but I haven't test it, for now I just use the whole cookie, mimic the browser's behavior.

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

* `pageID` - (required) An ID string.
* `chunkNo` - (optional, default: `0`)
* `cursor` - (optional, default: `{ "stack": [] }`)

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

* `requests` - (required) See below example.

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

```javascript
{
  statusCode: Number // HTTP status code.
  data: Object // Data in a collection.
}
```



### `submitTransaction(operations)`

Execute a raw call to /api/v3/submitTransaction

* `operations` - (required) The operations to submit. See below for example.

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