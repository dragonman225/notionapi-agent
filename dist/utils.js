"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wrapper of console.log().
 */
function log(..._arguments) {
    let args = Array.from(_arguments);
    args.unshift('(notionapi-agent)');
    console.log.apply(null, args);
}
exports.log = log;
/**
 * Failsafe JSON.parse() wrapper.
 * @param str - Payload to parse.
 * @returns Parsed object when success, undefined when fail.
 */
function parseJSON(str) {
    try {
        return JSON.parse(str);
    }
    catch (error) {
        return void 0;
    }
}
exports.parseJSON = parseJSON;
//# sourceMappingURL=utils.js.map