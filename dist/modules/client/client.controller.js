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
const client_service_1 = require("./client.service");
const create_client_dto_1 = require("./dto/create-client.dto");
const swagger_1 = require("@nestjs/swagger");
const basic_pagination_dto_1 = require("../../common/helpers/basic-pagination.dto");
const bank_account_service_1 = require("../bank-account/bank-account.service");
const file_service_1 = require("../file/file.service");
const update_client_dto_1 = require("./dto/update-client.dto");
const constant_1 = require("../../common/helpers/constant");
const find_client_params_dto_1 = require("./dto/find-client-params.dto");
const set_archived_status_dto_1 = require("./dto/set-archived-status.dto");
const passenger_service_1 = require("../passenger/passenger.service");
let ClientController = class ClientController extends controller_base_1.ControllerBase {
    constructor(service, bankAccountService, fileService, passengerService) {
        super(service, { create: create_client_dto_1.CreateClientDto });
        this.service = service;
        this.bankAccountService = bankAccountService;
        this.fileService = fileService;
        this.passengerService = passengerService;
    }
    async create(body, req) {
        body.account_id = req.headers[constant_1.ACCOUNT_ID_HEADER];
        return await super.create(body);
    }
    async find(params, pagination) {
        return await super.find(params, pagination);
    }
    async findContacts(id, pagination) {
        return await this.service.findContacts(id, pagination);
    }
    async findAll(id, pagination) {
        return await this.bankAccountService.findWithDeleted({ client_id: id }, pagination);
    }
    async findFiles(id, pagination) {
        return await this.fileService.findFilesByOwner(id, 'client', pagination);
    }
    async findServiceContracts(id, pagination) {
        return await this.service.getServiceContractsById(id, pagination);
    }
    async findClientPassengers(id, pagination) {
        return await this.passengerService.find({ client_id: id }, pagination);
    }
    async updateById(id, body, req) {
        body.account_id = req.headers[constant_1.ACCOUNT_ID_HEADER];
        return await super.updateById(id, body);
    }
    async setArchiveDStatus(id, body) {
        await this.service.setArchivedStatusById(id, body);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new client' }),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDto, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get all clients' }),
    swagger_1.ApiImplicitQuery({
        name: 'name',
        description: 'filter by name',
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
        name: 'owner_account_id',
        description: 'filter by owner_account_id',
        required: false,
        type: Number,
    }),
    __param(0, common_1.Query()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_client_params_dto_1.FindClientParamsDto, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "find", null);
__decorate([
    common_1.Get('/:id/contacts'),
    swagger_1.ApiOperation({ title: 'Get the contacts list' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findContacts", null);
__decorate([
    common_1.Get('/:id/bank_accounts'),
    swagger_1.ApiOperation({ title: 'Get bank accounts history' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id/files'),
    swagger_1.ApiOperation({ title: 'Get files' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findFiles", null);
__decorate([
    common_1.Get('/:id/service-contracts'),
    swagger_1.ApiOperation({ title: 'Get service contracts' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findServiceContracts", null);
__decorate([
    common_1.Get('/:id/passengers'),
    swagger_1.ApiOperation({ title: 'Get all client passengers' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findClientPassengers", null);
__decorate([
    common_1.Patch('/:id'),
    swagger_1.ApiOperation({ title: 'Update a client by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_client_dto_1.UpdateClientDto, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "updateById", null);
__decorate([
    common_1.Post('/set-archived-status/:id'),
    swagger_1.ApiOperation({ title: 'Archive/unarchive a client' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, set_archived_status_dto_1.SetArchivedStatusDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "setArchiveDStatus", null);
ClientController = __decorate([
    swagger_1.ApiUseTags('clients'),
    common_1.Controller('private/clients'),
    __metadata("design:paramtypes", [client_service_1.ClientService,
        bank_account_service_1.BankAccountService,
        file_service_1.FileService,
        passenger_service_1.PassengerService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map