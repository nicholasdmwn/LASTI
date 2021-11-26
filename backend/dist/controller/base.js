"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const express_1 = require("express");
const string_1 = require("../common/string");
class BaseController {
    router;
    basePath = '/';
    constructor() {
        this.router = (0, express_1.Router)();
    }
    infoRoutes() {
        const routes = [];
        this.router.stack.forEach((each) => {
            if (each.route && each.route.path) {
                const path = each.route.path;
                each.route.stack.forEach((endpoint) => {
                    if (endpoint && endpoint.method) {
                        routes.push({
                            method: endpoint.method.toLowerCase(),
                            path: path,
                        });
                    }
                });
            }
        });
        routes.sort((a, b) => {
            const order = {
                get: 3,
                post: 2,
                patch: 1,
                put: 0,
                delete: -1,
            };
            let aVal = order[a.method];
            let bVal = order[b.method];
            if (aVal === undefined) {
                aVal = -2;
            }
            if (bVal === undefined) {
                bVal = -2;
            }
            if (aVal === bVal) {
                return a.path.localeCompare(b.path);
            }
            return bVal - aVal;
        });
        const printedPath = [];
        routes.forEach((item) => {
            if (printedPath.indexOf(`${item.method}-${this.basePath}${item.path}`) !== -1) {
                return;
            }
            printedPath.push(`${item.method}-${this.basePath}${item.path}`);
            console.info(`\t\t${(0, string_1.MethodFormat)(item.method)} /api${this.basePath}${item.path}`);
        });
    }
}
exports.BaseController = BaseController;
