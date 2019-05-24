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
const account_type_service_1 = require("./account-type.service");
const swagger_1 = require("@nestjs/swagger");
const create_account_type_dto_1 = require("./dto/create-account-type.dto");
const update_account_type_dto_1 = require("./dto/update-account-type.dto");
const controller_base_1 = require("../../common/helpers/controller.base");
let AccountTypeController = class AccountTypeController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_account_type_dto_1.CreateAccountTypeDto, update: update_account_type_dto_1.UpdateAccountTypeDto });
        this.service = service;
    }
    async create(body) {
        return await super.create(body);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new account-type' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_type_dto_1.CreateAccountTypeDto]),
    __metadata("design:returntype", Promise)
], AccountTypeController.prototype, "create", null);
AccountTypeController = __decorate([
    swagger_1.ApiUseTags('account-type'),
    common_1.Controller('private/account-type'),
    __metadata("design:paramtypes", [account_type_service_1.AccountTypeService])
], AccountTypeController);
exports.AccountTypeController = AccountTypeController;
//# sourceMappingURL=account-type.controller.js.map