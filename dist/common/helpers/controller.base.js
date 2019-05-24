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
const class_validator_1 = require("class-validator");
const id_dto_1 = require("./id.dto");
const basic_pagination_dto_1 = require("./basic-pagination.dto");
const constant_1 = require("./constant");
class ControllerBase {
    constructor(service, dto) {
        this.service = service;
        this.dto = dto;
    }
    async create(body, req) {
        await this.validateDto(new this.dto.create(), body);
        return await this.service.create(body);
    }
    async find(params, pagination) {
        params = Object.assign({}, params);
        pagination = Object.assign({}, pagination);
        for (const key of Object.keys(params)) {
            if (constant_1.BASE_PAGINATION_PROPS.includes(key)) {
                delete params[key];
            }
        }
        return await this.service.find(params || {}, pagination);
    }
    async findById(id) {
        await this.validateId(id);
        return await this.service.findById(id);
    }
    async updateById(id, body) {
        await this.validateId(id);
        return await this.service.updateById(id, body);
    }
    async deleteById(id, req) {
        const accountId = req.headers[constant_1.ACCOUNT_ID_HEADER];
        return await this.service.deleteById(id, accountId);
    }
    errorHandler(errors) {
        const msg = errors.map(err => `(${typeof err.value}) '${err.value}' : ${Object.values(err.constraints).join(', ')}`).join(';\n');
        throw new common_1.BadRequestException(msg);
    }
    async validateId(id) {
        const errors = await class_validator_1.validate(Object.assign(new id_dto_1.IdDto(), { id }));
        if (errors.length) {
            this.errorHandler(errors);
        }
    }
    async validateDto(dto, body) {
        const dtoInstance = Object.assign(dto, body);
        const errors = await class_validator_1.validate(dtoInstance);
        if (errors.length) {
            this.errorHandler(errors);
        }
    }
}
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new item' }),
    swagger_1.ApiImplicitBody({
        name: 'body',
        type: Object,
    }),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ControllerBase.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get all items' }),
    __param(0, common_1.Query()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], ControllerBase.prototype, "find", null);
__decorate([
    common_1.Get('/:id'),
    swagger_1.ApiOperation({ title: 'Find an item by id' }),
    swagger_1.ApiImplicitParam({
        name: 'id',
        type: Number,
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ControllerBase.prototype, "findById", null);
__decorate([
    common_1.Patch('/:id'),
    swagger_1.ApiOperation({ title: 'Update an item by id' }),
    swagger_1.ApiImplicitParam({
        name: 'id',
        type: Number,
    }),
    swagger_1.ApiImplicitBody({
        name: 'body',
        type: Object,
    }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ControllerBase.prototype, "updateById", null);
__decorate([
    common_1.Delete('/:id'),
    swagger_1.ApiOperation({ title: 'Delete an item by id' }),
    swagger_1.ApiImplicitParam({
        name: 'id',
        type: Number,
    }),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ControllerBase.prototype, "deleteById", null);
exports.ControllerBase = ControllerBase;
//# sourceMappingURL=controller.base.js.map