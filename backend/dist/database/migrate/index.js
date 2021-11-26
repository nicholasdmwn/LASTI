"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
require("reflect-metadata");
const __1 = __importDefault(require(".."));
const dbInstance = typedi_1.Container.get(__1.default);
dbInstance.connect(true).then(async () => {
    await dbInstance.autoMigrate();
    return;
});
