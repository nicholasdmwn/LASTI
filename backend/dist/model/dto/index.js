"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDTOConstructor = exports.CreateResponseStandardError = exports.CreateResponseError = exports.CreateResponse = exports.ResponseStatus = void 0;
const http_1 = require("../../common/http");
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["OK"] = "ok";
    ResponseStatus["UNAUTHORIZED"] = "unauthorized";
    ResponseStatus["ERROR"] = "error";
})(ResponseStatus || (ResponseStatus = {}));
exports.ResponseStatus = ResponseStatus;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CreateResponse(status, data) {
    if (!data) {
        data = 'ok';
    }
    return {
        status_code: status,
        data: data,
    };
}
exports.CreateResponse = CreateResponse;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CreateResponseError(error) {
    const response = {
        status_code: ResponseStatus.ERROR,
        data: {
            code: http_1.StatusCodes.INTERNAL_SERVER_ERROR,
        },
    };
    if (error instanceof Error) {
        response.data.details = error.message;
    }
    else {
        response.data.details = error;
    }
    return response;
}
exports.CreateResponseError = CreateResponseError;
function CreateResponseStandardError(error) {
    return {
        status_code: ResponseStatus.ERROR,
        data: {
            code: error.code,
            details: error.details,
        },
    };
}
exports.CreateResponseStandardError = CreateResponseStandardError;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BaseDTOConstructor = function (source, dest) {
    const allowedKeys = Object.keys(dest);
    Object.assign(dest, source);
    Object.keys(dest)
        .filter((key) => allowedKeys.indexOf(key) === -1)
        .forEach((key) => {
        const findAndRemoveKey = (key) => {
            for (const k in dest) {
                const keyCasted = k;
                if (k === key) {
                    delete dest[keyCasted];
                    return;
                }
            }
        };
        findAndRemoveKey(key);
    });
};
exports.BaseDTOConstructor = BaseDTOConstructor;
