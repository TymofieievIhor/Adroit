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
const partner_service_1 = require("./partner.service");
const swagger_1 = require("@nestjs/swagger");
const controller_base_1 = require("../../common/helpers/controller.base");
const create_partner_dto_1 = require("./dto/create-partner.dto");
const update_partner_dto_1 = require("./dto/update-partner.dto");
const bank_account_service_1 = require("../bank-account/bank-account.service");
const basic_pagination_dto_1 = require("../../common/helpers/basic-pagination.dto");
const file_service_1 = require("../file/file.service");
const constant_1 = require("../../common/helpers/constant");
const set_archived_status_dto_1 = require("../client/dto/set-archived-status.dto");
const find_partner_dto_1 = require("./dto/find-partner.dto");
let PartnerController = class PartnerController extends controller_base_1.ControllerBase {
    constructor(service, bankAccountService, fileService) {
        super(service, { create: create_partner_dto_1.CreatePartnerDto, update: update_partner_dto_1.UpdatePartnerDto });
        this.service = service;
        this.bankAccountService = bankAccountService;
        this.fileService = fileService;
    }
    async findAll(id, pagination) {
        return await this.bankAccountService.findWithDeleted({ partner_id: id }, pagination);
    }
    async find(params, pagination) {
        return this.service.find(params, pagination);
    }
    async create(body, req) {
        body.account_id = req.headers[constant_1.ACCOUNT_ID_HEADER];
        return await super.create(body);
    }
    async updateById(id, body, req) {
        body.account_id = req.headers[constant_1.ACCOUNT_ID_HEADER];
        return await super.updateById(id, body);
    }
    async findFiles(id, pagination) {
        return await this.fileService.findFilesByOwner(id, 'partner', pagination);
    }
    async setArchiveDStatus(id, body) {
        await this.service.setArchivedStatusById(id, body);
    }
};
__decorate([
    common_1.Get('/:id/bank_accounts'),
    swagger_1.ApiOperation({ title: 'Get bank accounts history' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "findAll", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Find all partners' }),
    __param(0, common_1.Query()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_partner_dto_1.FindPartnerDto, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "find", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new partner' }),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partner_dto_1.CreatePartnerDto, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "create", null);
__decorate([
    common_1.Patch('/:id'),
    swagger_1.ApiOperation({ title: 'Update a partner by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_partner_dto_1.UpdatePartnerDto, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "updateById", null);
__decorate([
    common_1.Get('/:id/files'),
    swagger_1.ApiOperation({ title: 'Get files' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "findFiles", null);
__decorate([
    common_1.Post('/set-archived-status/:id'),
    swagger_1.ApiOperation({ title: 'Archive/unarchive a partner' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, set_archived_status_dto_1.SetArchivedStatusDto]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "setArchiveDStatus", null);
PartnerController = __decorate([
    swagger_1.ApiUseTags('partners'),
    common_1.Controller('private/partners'),
    __metadata("design:paramtypes", [partner_service_1.PartnerService, bank_account_service_1.BankAccountService, file_service_1.FileService])
], PartnerController);
exports.PartnerController = PartnerController;
//# sourceMappingURL=partner.controller.js.map