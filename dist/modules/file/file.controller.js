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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const controller_base_1 = require("../../common/helpers/controller.base");
const file_service_1 = require("./file.service");
const create_file_dto_1 = require("./dto/create-file.dto");
const update_file_dto_1 = require("./dto/update-file.dto");
let FileController = class FileController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_file_dto_1.CreateFileDto });
        this.service = service;
    }
    async create({}, req) {
        return await this.service.upload(req);
    }
    async updateById(id, body) {
        return await super.updateById(id, body);
    }
    async download(id, res) {
        return await this.service.download(id, res);
    }
    async deleteById(id, accountId) {
        return await this.service.deleteById(id, accountId);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Upload the file' }),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "create", null);
__decorate([
    common_1.Patch('/:id'),
    swagger_1.ApiOperation({ title: 'Update the file by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_file_dto_1.UpdateFileDto]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "updateById", null);
__decorate([
    common_1.Get('/download/:id'),
    swagger_1.ApiOperation({ title: 'Download the file by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "download", null);
__decorate([
    common_1.Delete('/:id'),
    swagger_1.ApiOperation({ title: 'Delete the file by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteById", null);
FileController = __decorate([
    swagger_1.ApiUseTags('file'),
    common_1.Controller('/private/file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map