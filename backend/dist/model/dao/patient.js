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
exports.PatientDAO = void 0;
const typeorm_1 = require("typeorm");
const treatment_1 = require("../../common/treatment");
let PatientDAO = class PatientDAO {
    id;
    nama;
    noTelp;
    treatment;
    masuk;
    keluar;
    createdAt;
    updatedAt;
    entityVersion;
    constructor(nama, noTelp, treatment) {
        this.nama = nama;
        this.noTelp = noTelp;
        this.treatment = treatment;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PatientDAO.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 512,
    }),
    __metadata("design:type", String)
], PatientDAO.prototype, "nama", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 32,
    }),
    __metadata("design:type", String)
], PatientDAO.prototype, "noTelp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: treatment_1.Treatment,
        default: treatment_1.Treatment.LAINNYA,
    }),
    __metadata("design:type", String)
], PatientDAO.prototype, "treatment", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], PatientDAO.prototype, "masuk", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], PatientDAO.prototype, "keluar", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PatientDAO.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PatientDAO.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({
        name: 'entity_version',
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], PatientDAO.prototype, "entityVersion", void 0);
PatientDAO = __decorate([
    (0, typeorm_1.Entity)({ name: 'patient' }),
    __metadata("design:paramtypes", [String, String, String])
], PatientDAO);
exports.PatientDAO = PatientDAO;
