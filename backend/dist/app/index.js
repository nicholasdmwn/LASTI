"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const typedi_1 = __importStar(require("typedi"));
const controller_1 = __importDefault(require("../controller"));
require("reflect-metadata");
const database_1 = __importDefault(require("../database"));
const config_1 = __importDefault(require("./config"));
const middleware_1 = require("./middleware");
let App = class App {
    database;
    config;
    expressApplication;
    controllers;
    constructor(database, config) {
        this.database = database;
        this.config = config;
        console.info('🔈 Starting Application...');
        this.expressApplication = (0, express_1.default)();
    }
    install() {
        this.controllers = typedi_1.default.get(controller_1.default);
        if (!this.controllers || !this.expressApplication) {
            throw new Error('😵 Cannot Instantiate Controllers!');
        }
        console.info('🚄 Routing...');
        this.expressApplication.use(middleware_1.RequestResponseManipulator);
        this.expressApplication.use(express_1.default.json({ strict: true }));
        this.expressApplication.use((0, cors_1.default)());
        this.expressApplication.use((0, helmet_1.default)());
        const controllers = this.controllers.getAll();
        for (const c of controllers) {
            if (!c.basePath.startsWith('/')) {
                continue;
            }
            console.info(`\t🔗 ${c.constructor.name.replace('Controller', '')} Routes`);
            this.expressApplication.use(`/api${c.basePath}`, c.router);
            c.infoRoutes();
        }
        this.expressApplication.use(middleware_1.ErrorMiddleware);
    }
    async run() {
        await this.database.connect();
        this.install();
        try {
            this.expressApplication?.listen(this.config.serverPort, () => {
                console.info('🔊 Application started');
            });
            process.on('SIGINT', () => {
                process.exit();
            });
            process.on('exit', async () => {
                await this.database.close();
                console.info('🛡 Application stopped');
            });
        }
        catch (error) {
            console.error(error);
        }
    }
};
App = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [database_1.default, config_1.default])
], App);
exports.default = App;
