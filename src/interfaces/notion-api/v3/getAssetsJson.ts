export interface AssetFile {
  hash: string
  /** Path to the asset. */
  path: string
  /** File size in bytes. */
  size: number
}

/** An empty object. */
export interface GetAssetsJsonRequest {}

export interface GetAssetsJsonResponse {
  /** Website entry path. */
  entry: string
  /** Paths to scripts, stylesheets, images, etc. */
  files: AssetFile[]
  /** A list of HTTP header names. */
  headersWhitelist: string[]
  /** A list of service proxy path prefixes. */
  proxyServerPathPrefixes: string[]
  /** Current version of Notion. */
  version: string
}