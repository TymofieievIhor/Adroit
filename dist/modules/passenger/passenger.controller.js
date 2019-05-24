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
const passenger_service_1 = require("./passenger.service");
const create_passenger_dto_1 = require("./dto/create-passenger.dto");
const swagger_1 = require("@nestjs/swagger");
const update_passenger_dto_1 = require("./dto/update-passenger.dto");
const constant_1 = require("../../common/helpers/constant");
const set_archived_status_dto_1 = require("../client/dto/set-archived-status.dto");
const find_passenger_params_dto_1 = require("./dto/find-passenger-params.dto");
const basic_pagination_dto_1 = require("../../common/helpers/basic-pagination.dto");
let PassengerController = class PassengerController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_passenger_dto_1.CreatePassengerDto });
        this.service = service;
    }
    async create(body) {
        return await super.create(body);
    }
    async updateById(id, body, req) {
        body.account_id = req.headers[constant_1.ACCOUNT_ID_HEADER];
        return await super.updateById(id, body);
    }
    async setArchiveDStatus(id, body) {
        await this.service.setArchivedStatusById(id, body);
    }
    async find(params, pagination) {
        return await this.service.find(params, pagination);
    }
    async findPassengersByClientId(clientId) {
        return await this.service.findPassengersByClientId(clientId);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new passenger' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_passenger_dto_1.CreatePassengerDto]),
    __metadata("design:returntype", Promise)
], PassengerController.prototype, "create", null);
__decorate([
    common_1.Patch('/:id'),
    swagger_1.ApiOperation({ title: 'Update a passenger by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_passenger_dto_1.UpdatePassengerDto, Object]),
    __metadata("design:returntype", Promise)
], PassengerController.prototype, "updateById", null);
__decorate([
    common_1.Post('/set-archived-status/:id'),
    swagger_1.ApiOperation({ title: 'Archive/unarchive a passenger' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, set_archived_status_dto_1.SetArchivedStatusDto]),
    __metadata("design:returntype", Promise)
], PassengerController.prototype, "setArchiveDStatus", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Find all passengers' }),
    __param(0, common_1.Query()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_passenger_params_dto_1.FindPassengerParamsDto, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], PassengerController.prototype, "find", null);
__decorate([
    common_1.Get('/client/:id'),
    swagger_1.ApiOperation({ title: 'Find passengers by the client id' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PassengerController.prototype, "findPassengersByClientId", null);
PassengerController = __decorate([
    swagger_1.ApiUseTags('passenger'),
    common_1.Controller('private/passenger'),
    __metadata("design:paramtypes", [passenger_service_1.PassengerService])
], PassengerController);
exports.PassengerController = PassengerController;
//# sourceMappingURL=passenger.controller.js.map