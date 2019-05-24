"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const file_controller_1 = require("./file.controller");
const file_service_1 = require("./file.service");
const file_entity_1 = require("./entities/file.entity");
const typeorm_1 = require("@nestjs/typeorm");
const driver_file_entity_1 = require("./entities/driver-file.entity");
const partner_file_entity_1 = require("./entities/partner-file.entity");
const client_file_entity_1 = require("./entities/client-file.entity");
const fileUtils_1 = require("./fileUtils");
let FileModule = class FileModule {
};
FileModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([file_entity_1.File, driver_file_entity_1.DriverFile, partner_file_entity_1.PartnerFile, client_file_entity_1.ClientFile])],
        controllers: [file_controller_1.FileController],
        providers: [file_service_1.FileService, fileUtils_1.FileUtils],
        exports: [file_service_1.FileService, fileUtils_1.FileUtils],
    })
], FileModule);
exports.FileModule = FileModule;
//# sourceMappingURL=file.module.js.map