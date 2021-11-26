"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestResponseManipulator = exports.ErrorMiddleware = void 0;
const error_1 = require("../common/error");
const http_1 = require("../common/http");
const string_1 = require("../common/string");
const dto_1 = require("../model/dto");
const ErrorMiddleware = async (error, req, res, next) => {
    if (error) {
        if (error instanceof error_1.StandardError) {
            res.returnError(error.code, (0, dto_1.CreateResponseStandardError)(error));
        }
        else if (error instanceof SyntaxError && error.message.includes('JSON at position')) {
            res.returnError(http_1.StatusCodes.BAD_REQUEST, (0, dto_1.CreateResponseStandardError)(new error_1.StandardError(error.message, http_1.StatusCodes.BAD_REQUEST)));
        }
        else {
            res.returnError(http_1.StatusCodes.INTERNAL_SERVER_ERROR, (0, dto_1.CreateResponseError)(error));
        }
        return;
    }
    next();
};
exports.ErrorMiddleware = ErrorMiddleware;
const RequestResponseManipulator = (req, res, next) => {
    const start = new Date();
    const base = () => {
        const end = new Date();
        const httpStatus = (0, string_1.StringPadding)(18, (0, string_1.HttpStatusFormat)(req.statusCode !== undefined ? res.statusCode : 100), ' ');
        const method = (0, string_1.StringPadding)(12, (0, string_1.MethodFormat)(req.method), ' ');
        const timeInMS = (0, string_1.StringPadding)(8, `${end.getTime() - start.getTime()}ms`, ' ');
        const prefix = `📦 | ${new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta',
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
            second: 'numeric',
        })} | ${httpStatus} | ${method} | ${timeInMS}`;
        console.info(`${prefix} | ${req.path}`);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.return = (responseBody) => {
        res.status(http_1.StatusCodes.OK).json(responseBody);
        base();
        return res;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.returnError = (code, responseBody) => {
        res.status(code).json(responseBody);
        base();
        return res;
    };
    next();
};
exports.RequestResponseManipulator = RequestResponseManipulator;
