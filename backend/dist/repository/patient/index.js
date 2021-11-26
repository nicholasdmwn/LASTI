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
exports.PatientRepository = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const __1 = require("..");
const patient_1 = require("../../model/dao/patient");
let PatientRepository = class PatientRepository extends __1.BaseRepository {
    constructor() {
        super();
    }
    async create(item) {
        const repo = await this.getRepository(patient_1.PatientDAO);
        return await repo.save(item);
    }
    async find(id) {
        const repo = await this.getRepository(patient_1.PatientDAO);
        return await repo.findOne(id);
    }
    async getAllPatient() {
        const repo = await this.getRepository(patient_1.PatientDAO);
        return await repo.find({
            order: { createdAt: 'ASC' },
            where: { masuk: (0, typeorm_1.IsNull)(), keluar: (0, typeorm_1.IsNull)() },
        });
    }
    async getAllPastPatient() {
        const repo = await this.getRepository(patient_1.PatientDAO);
        return await repo.find({
            where: { masuk: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()), keluar: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
        });
    }
    async start(id) {
        const repo = await this.getRepository(patient_1.PatientDAO);
        await repo.update({ id }, { masuk: new Date() });
    }
    async end(id) {
        const repo = await this.getRepository(patient_1.PatientDAO);
        await repo.update({ id }, { keluar: new Date() });
    }
};
PatientRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], PatientRepository);
exports.PatientRepository = PatientRepository;
