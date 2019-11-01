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
const logger_1 = require("@dnpr/logger");
const utils_1 = require("./utils");
const strings_1 = require("./strings");
const log = new logger_1.Logger('notionapi-agent');
/*************************************************************************
 * Constants                                                             *
 *************************************************************************/
const NOTION_HOST = 'www.notion.so';
const API_BASE = '/api/v3';
/*************************************************************************
 * NotionAgent implementation                                            *
 *************************************************************************/
/**
 * A class that wraps Notion.so's HTTP API as JavaScript functions.
 */
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
        if (opts.verbose)
            log.setLogLevel('verbose');
        if (!this.suppressWarning && this.token.length === 0) {
            log.warn(strings_1.strings.NO_TOKEN_WARNING);
        }
    }
    /**
     * Make a POST request to /api/v3/loadPageChunk for one chunk of a page.
     *
     * @remarks
     * The chunk contains only top level blocks.
     *
     * @param pageID - The ID (with dashes) of a page.
     * @param chunkNo - The chunk number. Starting from 0, add 1 for each
     * chunk received. Specify 0 or neglect this parameter for the first
     * chunk.
     * @param cursor - The {@link Cursor} returned by Notion in the last chunk.
     * Neglect this parameter for the first chunk.
     * @returns An object containing response data and error.
     */
    loadPageChunk(pageID, chunkNo, cursor) {
        assert_1.default(pageID, strings_1.strings.PAGEID_NOT_FOUND);
        const apiURL = API_BASE + '/loadPageChunk';
        const goodCursor = chunkNo
            ? cursor
                ? cursor // cursor is truthy, trust the user
                : { "stack": [] } // cursor is falsy, use default cursor
            : { "stack": [] }; // chunkNo is falsy, use default cursor
        const requestData = {
            "pageId": pageID,
            "limit": 50,
            "cursor": goodCursor,
            "chunkNumber": chunkNo ? chunkNo : 0,
            "verticalColumns": false
        };
        return this.makeRequestToNotion(apiURL, requestData);
    } // loadPageChunk
    /**
     * Make a POST request to /api/v3/getAssetsJson for assets list.
     * @returns An object containing response data and error.
     */
    getAssetsJson() {
        const apiURL = API_BASE + '/getAssetsJson';
        const requestData = {};
        return this.makeRequestToNotion(apiURL, requestData);
    } // getAssetsJson
    /**
     * Make a POST request to /api/v3/getRecordValues for some records.
     * @param requests - Each request specifies which record to get from
     * what table.
     * @returns An object containing response data and error.
     */
    getRecordValues(requests) {
        assert_1.default(Array.isArray(requests), strings_1.strings.IDS_NOT_ARRAY);
        const apiURL = API_BASE + '/getRecordValues';
        const requestData = {
            "requests": requests.map((request) => {
                return {
                    "table": request.table,
                    "id": request.id
                };
            })
        };
        return this.makeRequestToNotion(apiURL, requestData);
    } // getRecordValues
    /**
     * Make a POST request to /api/v3/loadUserContent for user details.
     * @returns An object containing response data and error.
     */
    loadUserContent() {
        const apiURL = API_BASE + '/loadUserContent';
        const requestData = {};
        return this.makeRequestToNotion(apiURL, requestData);
    } // loadUserContent
    /**
     * Make a POST request to /api/v3/queryCollection for data of a
     * collection under a view.
     * @param collectionID
     * @param collectionViewID
     * @param aggregateQueries
     * @returns An object containing response data and error.
     */
    queryCollection(collectionID, collectionViewID, aggregateQueries) {
        assert_1.default(collectionID, strings_1.strings.COLLECTION_ID_NOT_FOUND);
        assert_1.default(collectionViewID, strings_1.strings.COLLECTION_VIEW_ID_NOT_FOUND);
        const apiURL = API_BASE + '/queryCollection';
        const requestData = {
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
        };
        return this.makeRequestToNotion(apiURL, requestData);
    } // queryCollection
    /**
     * Make a POST request to /api/v3/submitTransaction to write some
     * changes.
     * @param operations
     * @returns An object containing response data and error.
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
        const requestData = {
            "operations": operations
        };
        return this.makeRequestToNotion(apiURL, requestData);
    } // submitTransaction
    /**
     * Make a POST request to /api/v3/getSnapshotsList to read snapshots of
     * a block.
     * @param blockId - ID of a block.
     * @param size - Max number of snapshots to get.
     * @returns An object containing response data and error.
     */
    getSnapshotsList(blockId, size) {
        assert_1.default(blockId);
        assert_1.default(size);
        const apiURL = API_BASE + '/getSnapshotsList';
        const requestData = {
            blockId,
            size
        };
        return this.makeRequestToNotion(apiURL, requestData);
    } // getSnapshotsList
    /**
     * Make a POST request to /api/v3/getActivityLog to read activity log of
     * a block.
     * @param navigableBlockId - ID of a "page" or "collection_view_page"
     * block. ID of other type of block doesn't results in meaningful
     * responses.
     * @param size - Max number of activities to get.
     * @param spaceId - The workspace ID of the navigableBlock.
     * @param collectionId - ID of a collection. Only effective when
     * navigableBlock is a "collection_view_page" block.
     * @returns An object containing response data and error.
     */
    getActivityLog(navigableBlockId, size, spaceId, collectionId) {
        assert_1.default(navigableBlockId);
        assert_1.default(size);
        assert_1.default(spaceId);
        const apiURL = API_BASE + '/getActivityLog';
        const requestData = JSON.stringify({
            navigableBlockId,
            size,
            spaceId,
            collectionId
        });
        return this.makeRequestToNotion(apiURL, requestData);
    } // getActivityLog
    /**
     * Make a request to Notion's API.
     * @param apiPath - API path.
     * @param requestData - Request object, which will be stringify as JSON.
     * @returns An object containing response data and error.
     */
    async makeRequestToNotion(apiPath, requestData) {
        /* Options for https.request(). */
        const httpOptions = {
            hostname: NOTION_HOST,
            port: 443,
            path: apiPath,
            method: 'POST',
            authority: NOTION_HOST,
            headers: {
                'accept': '*/*',
                'accept-language': 'en-US,en;q=0.9',
                'accept-encoding': 'gzip, deflate',
                'content-type': 'application/json',
                'cookie': `token_v2=${this.token}`,
                'origin': 'https://' + NOTION_HOST,
                'referer': 'https://' + NOTION_HOST,
                'user-agent': strings_1.strings.REQUEST_USER_AGENT
            }
        };
        /** Stringify request data. */
        let payload;
        try {
            payload = JSON.stringify(requestData);
        }
        catch (error) {
            /** Use Notion's error structure. */
            return {
                error: {
                    errorId: 'none',
                    message: 'Fail to stringify request data to JSON.',
                    name: 'NotionAgentError',
                }
            };
        }
        /** Verbose logging. */
        log.verbose(`Request ${apiPath}, data ${payload.slice(0, 40)} ...`);
        /** Make the request. */
        let res = await make_request_1.makeHTTPSRequest(httpOptions, payload);
        if (res.statusCode === 200) {
            return {
                data: utils_1.parseJSON(res.responseBuffer)
            };
        }
        else {
            return {
                error: utils_1.parseJSON(res.responseBuffer)
            };
        }
    } // makeRequestToNotion
} // NotionAgent
exports.NotionAgent = NotionAgent;
//# sourceMappingURL=index.js.map