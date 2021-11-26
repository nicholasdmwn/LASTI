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
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../app/config"));
const patient_1 = require("../model/dao/patient");
let DatabaseConnection = class DatabaseConnection {
    config;
    connection;
    constructor(config) {
        this.config = config;
    }
    isConnected() {
        return !!this.connection;
    }
    async close() {
        if (!this.connection) {
            throw new Error('😲 Database is not connected');
        }
        await this.connection.close();
    }
    async connect(overrideLog) {
        if (!overrideLog) {
            overrideLog = false;
        }
        if (!this.connection) {
            console.info('📕 Connecting to database...');
            const connectionOptions = {
                type: 'mysql',
                host: this.config.databaseHost,
                port: this.config.databasePort,
                username: this.config.databaseUsername,
                password: this.config.databasePassword,
                database: this.config.databaseName,
                entities: [patient_1.PatientDAO],
            };
            this.connection = await (0, typeorm_1.createConnection)({
                ...connectionOptions,
                logging: ['migration', 'error', 'query'],
            });
            console.info('📗 Connected to database');
        }
    }
    async autoMigrate() {
        if (!this.connection) {
            throw new Error('😲 Database is not connected');
        }
        console.info('📲 Synchronizing model...');
        await this.connection.synchronize();
        console.info('📱 Model synchronized');
        await this.connection.close();
    }
    getRepository(target) {
        if (!this.connection) {
            throw new Error('😲 Database is not connected');
        }
        try {
            return this.connection.getRepository(target);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
DatabaseConnection = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [config_1.default])
], DatabaseConnection);
exports.default = DatabaseConnection;
