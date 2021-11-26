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
exports.PatientService = void 0;
const typedi_1 = require("typedi");
const error_1 = require("../../common/error");
const http_1 = require("../../common/http");
const patient_1 = require("../../model/dao/patient");
const patient_2 = require("../../repository/patient");
const qrcode_1 = __importDefault(require("qrcode"));
let PatientService = class PatientService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(item) {
        const entity = new patient_1.PatientDAO(item.nama, item.noTelp, item.treatment);
        return await this.repo.create(entity);
    }
    async getStatus(id) {
        const result = await this.repo.find(id);
        if (!result) {
            throw new error_1.StandardError('ID not found.', http_1.StatusCodes.BAD_REQUEST);
        }
        const allPatientRecords = await this.repo.getAllPastPatient();
        const resultFinal = {
            antrian: 0,
            estimation: '?',
            patient: result
        };
        const inqueue = await this.repo.getAllPatient();
        if (inqueue.length > 0) {
            inqueue.forEach((each, index) => {
                if (each.id === id) {
                    resultFinal.antrian = index;
                }
            });
        }
        let total = 0;
        let item = 0;
        if (allPatientRecords.length > 2) {
            allPatientRecords.forEach((each) => {
                if (each.masuk && each.keluar) {
                    item++;
                    total = total + (each.keluar.getTime() - each.masuk.getTime());
                }
            });
            resultFinal.estimation = Math.ceil(total / item);
        }
        return resultFinal;
    }
    async masuk(id) {
        const result = await this.repo.find(id);
        if (!result) {
            throw new error_1.StandardError('ID not found.', http_1.StatusCodes.BAD_REQUEST);
        }
        await this.repo.start(id);
        return result;
    }
    async keluar(id) {
        const result = await this.repo.find(id);
        if (!result) {
            throw new error_1.StandardError('ID not found.', http_1.StatusCodes.BAD_REQUEST);
        }
        await this.repo.end(id);
    }
    async generate(link) {
        return await qrcode_1.default.toDataURL(link, {
            errorCorrectionLevel: 'M',
            type: 'image/png',
        });
    }
};
PatientService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [patient_2.PatientRepository])
], PatientService);
exports.PatientService = PatientService;
