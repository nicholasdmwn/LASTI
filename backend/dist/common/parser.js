"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseIntOrDefault = exports.ParseBoolean = exports.ParseInt = void 0;
const error_1 = require("./error");
const http_1 = require("./http");
function ParseInt(parsedString, property) {
    if (!parsedString) {
        throw new error_1.StandardError(`'${property}' is missing.`, http_1.StatusCodes.BAD_REQUEST);
    }
    const result = parseInt(parsedString);
    if (isNaN(result) || !isFinite(result)) {
        if (!property) {
            throw new Error('Found an error while parsing integer.');
        }
        else {
            throw new error_1.StandardError(`Found an error while parsing '${property}' as integer.`, http_1.StatusCodes.BAD_REQUEST);
        }
    }
    return result;
}
exports.ParseInt = ParseInt;
function ParseIntOrDefault(defValue, parsedString, property) {
    if (!parsedString) {
        return defValue;
    }
    const result = parseInt(parsedString);
    if (isNaN(result) || !isFinite(result)) {
        if (!property) {
            throw new Error('Found an error while parsing integer.');
        }
        else {
            throw new error_1.StandardError(`Found an error while parsing '${property}' as integer.`, http_1.StatusCodes.BAD_REQUEST);
        }
    }
    return result;
}
exports.ParseIntOrDefault = ParseIntOrDefault;
function ParseBoolean(parsedString) {
    if (!parsedString) {
        return false;
    }
    switch (parsedString.toLowerCase().trim()) {
        case 'true':
        case '1':
        case 'yes':
            return true;
    }
    return false;
}
exports.ParseBoolean = ParseBoolean;
