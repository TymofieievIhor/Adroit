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
const controller_base_1 = require("../../common/helpers/controller.base");
const driver_service_1 = require("./driver.service");
const create_driver_dto_1 = require("./dto/create-driver.dto");
const update_driver_dto_1 = require("./dto/update-driver.dto");
const swagger_1 = require("@nestjs/swagger");
const find_driver_params_dto_1 = require("./dto/find-driver-params.dto");
const bank_account_service_1 = require("../bank-account/bank-account.service");
const basic_pagination_dto_1 = require("../../common/helpers/basic-pagination.dto");
const file_service_1 = require("../file/file.service");
const constant_1 = require("../../common/helpers/constant");
const constants_1 = require("../../common/helpers/auth/constants");
const function_1 = require("../../common/helpers/function");
let DriverController = class DriverController extends controller_base_1.ControllerBase {
    constructor(service, bankAccountService, fileService) {
        super(service, { create: create_driver_dto_1.CreateDriverDto, update: update_driver_dto_1.UpdateDriverDto });
        this.service = service;
        this.bankAccountService = bankAccountService;
        this.fileService = fileService;
    }
    async create(body, req) {
        body.account_id = req.headers[constant_1.ACCOUNT_ID_HEADER];
        return await super.create(body);
    }
    async find(params, pagination) {
        return await super.find(params, pagination);
    }
    async findMe(req) {
        return await this.service.findByAccountId(req.headers[constant_1.ACCOUNT_ID_HEADER]);
    }
    async findById(id) {
        return await super.findById(id);
    }
    async findAll(id, pagination) {
        return await this.bankAccountService.findWithDeleted({ driver_id: id }, pagination);
    }
    async updateById(id, body, req) {
        body.account_id = req.headers[constant_1.ACCOUNT_ID_HEADER];
        return await super.updateById(id, body);
    }
    async findFiles(id, pagination) {
        return await this.fileService.findFilesByOwner(id, 'driver', pagination);
    }
    async createTripDailyChecklist(req) {
        return await this.service.createTripDailyChecklist(req[constants_1.REQUEST_PROPERTY_TOKEN].driver, req[constants_1.REQUEST_PROPERTY_TOKEN].client, function_1.extractIpAddress(req));
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new driver' }),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_driver_dto_1.CreateDriverDto, Object]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get all drivers' }),
    swagger_1.ApiImplicitQuery({
        name: 'first_name',
        description: 'filter by fist_name',
        required: false,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'last_name',
        description: 'filter by last_name',
        required: false,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'email',
        description: 'filter by email',
        required: false,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'phone_number',
        description: 'filter by phone_number',
        required: false,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'partner_id',
        description: 'filter by partner_id',
        required: false,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'ssn',
        description: 'filter by ssn',
        required: false,
        type: String,
    }),
    __param(0, common_1.Query()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_driver_params_dto_1.FindDriverParamsDto, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "find", null);
__decorate([
    common_1.Get('/me'),
    swagger_1.ApiOperation({ title: 'Get driver profile for authorized user' }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "findMe", null);
__decorate([
    common_1.Get('/:id'),
    swagger_1.ApiOperation({ title: 'Get a driver by id' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "findById", null);
__decorate([
    common_1.Get('/:id/bank_accounts'),
    swagger_1.ApiOperation({ title: 'Get bank accounts history' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "findAll", null);
__decorate([
    common_1.Patch('/:id'),
    swagger_1.ApiOperation({ title: 'Update a driver by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_driver_dto_1.UpdateDriverDto, Object]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "updateById", null);
__decorate([
    common_1.Get('/:id/files'),
    swagger_1.ApiOperation({ title: 'Get files' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "findFiles", null);
__decorate([
    common_1.Post('/trip_daily_checklist'),
    swagger_1.ApiOperation({ title: 'Create a new trip daily checklist' }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "createTripDailyChecklist", null);
DriverController = __decorate([
    swagger_1.ApiUseTags('drivers'),
    common_1.Controller('/private/drivers'),
    __metadata("design:paramtypes", [driver_service_1.DriverService, bank_account_service_1.BankAccountService, file_service_1.FileService])
], DriverController);
exports.DriverController = DriverController;
//# sourceMappingURL=driver.controller.js.map