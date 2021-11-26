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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const dto_1 = require("../../model/dto");
const base_1 = require("../base");
let TemplateController = class TemplateController extends base_1.BaseController {
    basePath = '/health';
    constructor() {
        super();
        this.router.get('/', this.something.bind(this));
    }
    something(req, res) {
        res.json((0, dto_1.CreateResponse)(dto_1.ResponseStatus.OK, 'ok'));
    }
};
TemplateController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], TemplateController);
exports.default = TemplateController;
