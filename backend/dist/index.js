"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const typedi_1 = require("typedi");
const appInstance = typedi_1.Container.get(app_1.default);
appInstance.run();
