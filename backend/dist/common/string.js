"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusFormat = exports.MethodFormat = exports.StringPadding = void 0;
const http_1 = require("./http");
function StringPadding(width, string, padding) {
    return width <= string.length ? string : StringPadding(width, string + padding, padding);
}
exports.StringPadding = StringPadding;
function MethodFormat(method) {
    method = method.toLowerCase();
    switch (method) {
        case 'get':
            return `🟩 ${StringPadding(7, 'GET', ' ')}`;
        case 'post':
            return `🟦 ${StringPadding(7, 'POST', ' ')}`;
        case 'patch':
            return `🟨 ${StringPadding(7, 'PATCH', ' ')}`;
        case 'put':
            return `🟧 ${StringPadding(7, 'PUT', ' ')}`;
        case 'delete':
            return `🟥 ${StringPadding(7, 'DELETE', ' ')}`;
    }
    return `❔ ${StringPadding(7, 'UNKNOWN', ' ')}`;
}
exports.MethodFormat = MethodFormat;
function HttpStatusFormat(status) {
    if (status < 200) {
        return `🟦 ${status} ${http_1.StatusCodes[status]}`;
    }
    else if (status < 300) {
        return `🟩 ${status} ${http_1.StatusCodes[status]}`;
    }
    else if (status < 400) {
        return `🟨 ${status} ${http_1.StatusCodes[status]}`;
    }
    else if (status < 500) {
        return `🟥 ${status} ${http_1.StatusCodes[status]}`;
    }
    else {
        return `🟧 ${status} ${http_1.StatusCodes[status]}`;
    }
}
exports.HttpStatusFormat = HttpStatusFormat;
