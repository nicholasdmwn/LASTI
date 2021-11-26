"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const dto_1 = require("../../model/dto");
const base_1 = require("../base");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const patient_1 = require("../../service/patient");
const config_1 = __importDefault(require("../../app/config"));
let PatientController = class PatientController extends base_1.BaseController {
    service;
    config;
    basePath = '/patient';
    constructor(service, config) {
        super();
        this.service = service;
        this.config = config;
        this.router.post('/', (0, express_async_handler_1.default)(this.create.bind(this)));
        this.router.get('/:id', (0, express_async_handler_1.default)(this.getStatus.bind(this)));
        this.router.get('/masuk/:id', (0, express_async_handler_1.default)(this.masuk.bind(this)));
        this.router.get('/keluar/:id', (0, express_async_handler_1.default)(this.keluar.bind(this)));
    }
    async create(req, res) {
        const item = req.body;
        const entity = await this.service.create(item);
        const link = await this.service.generate(`${this.config.serverHost}/masuk/${entity.id}`);
        const response = { image: link, id: entity.id };
        res.json((0, dto_1.CreateResponse)(dto_1.ResponseStatus.OK, response));
    }
    async masuk(req, res) {
        const entity = await this.service.masuk(req.params.id);
        const link = await this.service.generate(`${this.config.serverHost}/keluar/${entity.id}`);
        const response = { image: link, id: entity.id };
        res.json((0, dto_1.CreateResponse)(dto_1.ResponseStatus.OK, response));
    }
    async keluar(req, res) {
        await this.service.keluar(req.params.id);
        res.json((0, dto_1.CreateResponse)(dto_1.ResponseStatus.OK));
    }
    async getStatus(req, res) {
        const result = await this.service.getStatus(req.params.id);
        res.json((0, dto_1.CreateResponse)(dto_1.ResponseStatus.OK, result));
    }
};
PatientController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [patient_1.PatientService, config_1.default])
], PatientController);
exports.default = PatientController;
