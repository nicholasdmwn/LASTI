"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardError = void 0;
class StandardError extends Error {
    details;
    code;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(details, code) {
        super();
        this.details = details;
        this.code = code;
        if (code < 400 || code > 599) {
            throw new Error('😱 Non-error HTTP Codes returned');
        }
    }
}
exports.StandardError = StandardError;
