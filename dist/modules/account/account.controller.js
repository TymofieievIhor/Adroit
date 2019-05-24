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
const account_service_1 = require("./account.service");
const swagger_1 = require("@nestjs/swagger");
const create_account_dto_1 = require("./dto/create-account.dto");
const update_account_dto_1 = require("./dto/update-account.dto");
const controller_base_1 = require("../../common/helpers/controller.base");
const set_account_block_status_dto_1 = require("./dto/set-account-block-status.dto");
const constant_1 = require("../../common/helpers/constant");
const find_account_dto_1 = require("./dto/find-account.dto");
const basic_pagination_dto_1 = require("../../common/helpers/basic-pagination.dto");
const update_account_password_dto_1 = require("./dto/update-account-password.dto");
let AccountController = class AccountController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_account_dto_1.CreateAccountDto, update: update_account_dto_1.UpdateAccountDto });
        this.service = service;
    }
    async create(body) {
        return await super.create(body);
    }
    async acceptTos(req) {
        await super.validateId(req.headers[constant_1.ACCOUNT_ID_HEADER]);
        return (this.service.acceptTos(req.headers[constant_1.ACCOUNT_ID_HEADER], req));
    }
    async updatePassword(req, body) {
        return await this.service.updatePassword(req.headers[constant_1.ACCOUNT_ID_HEADER], body);
    }
    async updateById(id, body) {
        await super.validateId(id);
        return await this.service.updateById(id, body);
    }
    async updateMe(req, body) {
        await super.validateId(req.headers[constant_1.ACCOUNT_ID_HEADER]);
        return await this.service.updateById(req.headers[constant_1.ACCOUNT_ID_HEADER], body);
    }
    async find(params, pagination) {
        return this.service.find(params, pagination);
    }
    async getMe(req) {
        return await this.service.findById(req.headers[constant_1.ACCOUNT_ID_HEADER]);
    }
    async resetPassword(id) {
        return await this.service.resetPassword(id);
    }
    async setBlockStatusById(id, body) {
        return await this.service.setBlockStatusById(id, body);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new account' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "create", null);
__decorate([
    common_1.Patch('/accept-tos'),
    swagger_1.ApiOperation({ title: 'Accept ToS for the current account' }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "acceptTos", null);
__decorate([
    common_1.Patch('/update-my-password'),
    swagger_1.ApiOperation({ title: 'Update the password for the authorized account' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_account_password_dto_1.UpdateAccountPasswordDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updatePassword", null);
__decorate([
    common_1.Patch(':id'),
    swagger_1.ApiOperation({ title: 'Update an account by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_account_dto_1.UpdateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updateById", null);
__decorate([
    common_1.Patch(),
    swagger_1.ApiOperation({ title: 'Update the current account' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_account_dto_1.UpdateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updateMe", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Find all accounts' }),
    __param(0, common_1.Query()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_account_dto_1.FindAccountDto, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "find", null);
__decorate([
    common_1.Get('/me'),
    swagger_1.ApiOperation({ title: 'Get the current account' }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getMe", null);
__decorate([
    common_1.Patch('/:id/reset-password'),
    swagger_1.ApiOperation({ title: 'Reset the password (to the default one) with send email' }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "resetPassword", null);
__decorate([
    common_1.Post('/set-block-status/:id'),
    swagger_1.ApiOperation({ title: 'Block/unblock an account by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, set_account_block_status_dto_1.SetAccountBlockStatusDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "setBlockStatusById", null);
AccountController = __decorate([
    swagger_1.ApiUseTags('account'),
    common_1.Controller('private/account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map