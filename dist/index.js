"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*************************************************************************
 * Library imports                                                       *
 *************************************************************************/
const assert_1 = __importDefault(require("assert"));
const make_request_1 = require("@dnpr/make-request");
const utils_1 = require("./utils");
const strings_1 = require("./strings");
/*************************************************************************
 * Constants                                                             *
 *************************************************************************/
const API_BASE = '/api/v3';
/*************************************************************************
 * NotionAgent implementation                                            *
 *************************************************************************/
/* An agent to interact with Notion.so's HTTP API */
class NotionAgent {
    constructor(opts = {
        token: '',
        timezone: 'Asia/Taipei',
        locale: 'en',
        suppressWarning: false,
        verbose: false
    }) {
        this.token = opts.token || '';
        this.timezone = opts.timezone || 'Asia/Taipei';
        this.locale = opts.locale || 'en';
        this.suppressWarning = (typeof opts.suppressWarning === 'undefined')
            ? false : opts.suppressWarning;
        this.verbose = (typeof opts.verbose === 'undefined')
            ? false : opts.verbose;
        if (!this.suppressWarning && this.token.length === 0) {
            utils_1.log(strings_1.strings.NO_TOKEN_WARNING);
        }
    }
    /**
     * Execute a raw call to /api/v3/loadPageChunk
     * @param pageID - The page ID to request.
     * @param chunkNo - The chunk number to request.
     * @param cursor - The cursor.
     * @returns HTTP status code and JSON object from response.
     */
    loadPageChunk(pageID, chunkNo = 0, cursor = { "stack": [] }) {
        assert_1.default(pageID, strings_1.strings.PAGEID_NOT_FOUND);
        const apiURL = API_BASE + '/loadPageChunk';
        const requestData = JSON.stringify({
            "pageId": pageID,
            "limit": 50,
            "cursor": cursor,
            "chunkNumber": chunkNo,
            "verticalColumns": false
        });
        return this.makeRequestToNotion(apiURL, requestData);
    } // loadPageChunk
    /**
     * Execute a raw call to /api/v3/getAssetsJson
     * @returns HTTP status code and JSON object from response.
     */
    getAssetsJson() {
        const apiURL = API_BASE + '/getAssetsJson';
        const requestData = JSON.stringify({});
        return this.makeRequestToNotion(apiURL, requestData);
    } // getAssetsJson
    /**
     * Execute a raw call to /api/v3/getRecordValues
     * @param requests - The requests to make.
     * @returns HTTP status code and JSON object from response.
     */
    getRecordValues(requests) {
        assert_1.default(Array.isArray(requests), strings_1.strings.IDS_NOT_ARRAY);
        const apiURL = API_BASE + '/getRecordValues';
        const requestData = JSON.stringify({
            "requests": requests.map((request) => {
                return {
                    "table": request.table,
                    "id": request.id
                };
            })
        });
        return this.makeRequestToNotion(apiURL, requestData);
    } // getRecordValues
    /**
     * Execute a raw call to /api/v3/loadUserContent
     * @returns HTTP status code and JSON object from response.
     */
    loadUserContent() {
        const apiURL = API_BASE + '/loadUserContent';
        const requestData = JSON.stringify({});
        return this.makeRequestToNotion(apiURL, requestData);
    } // loadUserContent
    /**
     * Execute a raw call to /api/v3/queryCollection
     * @param collectionID
     * @param collectionViewID
     * @param aggregateQueries
     * @returns HTTP status code and JSON object from response.
     */
    queryCollection(collectionID, collectionViewID, aggregateQueries) {
        assert_1.default(collectionID, strings_1.strings.COLLECTION_ID_NOT_FOUND);
        assert_1.default(collectionViewID, strings_1.strings.COLLECTION_VIEW_ID_NOT_FOUND);
        const apiURL = API_BASE + '/queryCollection';
        const requestData = JSON.stringify({
            "collectionId": collectionID,
            "collectionViewId": collectionViewID,
            "query": {
                "aggregate": aggregateQueries,
                "filter_operator": "and",
                "filter": [],
                "sort": []
            },
            "loader": {
                "type": "table",
                "limit": 10000,
                "userTimeZone": this.timezone,
                "userLocale": this.locale,
                "loadContentCover": true
            }
        });
        return this.makeRequestToNotion(apiURL, requestData);
    } // queryCollection
    /**
     * Execute a raw call to /api/v3/submitTransaction
     * @param operations
     * @returns HTTP status code and JSON object from response.
     */
    submitTransaction(operations) {
        assert_1.default(Array.isArray(operations));
        operations.forEach(operation => {
            assert_1.default(operation.id);
            assert_1.default(operation.table);
            assert_1.default(operation.path);
            assert_1.default(operation.command);
            assert_1.default(operation.args);
        });
        const apiURL = API_BASE + '/submitTransaction';
        const requestData = JSON.stringify({
            "operations": operations
        });
        return this.makeRequestToNotion(apiURL, requestData);
    } // submitTransaction
    /**
     * Make a request to Notion API.
     * @param apiURL - Notion API URL.
     * @param requestData - Request body.
     * @returns HTTP status code and JSON object from response.
     */
    async makeRequestToNotion(apiURL, requestData) {
        /* Options passed to https.request(). */
        const httpOptions = {
            hostname: 'www.notion.so',
            port: 443,
            path: apiURL,
            method: 'POST',
            authority: 'www.notion.so',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-US,en;q=0.9',
                'accept-encoding': 'gzip, deflate',
                'content-length': requestData.length,
                'content-type': 'application/json',
                'cookie': `token_v2=${this.token}`,
                'origin': 'https://www.notion.so',
                'referer': 'https://www.notion.so',
                'user-agent': strings_1.strings.REQUEST_USER_AGENT
            }
        };
        if (this.verbose)
            utils_1.log(`Request ${apiURL}, data ${requestData.slice(0, 40)} ...`);
        let res = await make_request_1.makeHTTPSRequest(httpOptions, requestData);
        let resParsed = {
            statusCode: res.statusCode,
            data: utils_1.parseJSON(res.responseBuffer)
        };
        return resParsed;
    } // makeRequestToNotion
} // NotionAgent
exports.NotionAgent = NotionAgent;
//# sourceMappingURL=index.js.map