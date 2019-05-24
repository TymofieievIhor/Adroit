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
const contact_service_1 = require("./contact.service");
const create_contact_dto_1 = require("./dto/create-contact.dto");
const swagger_1 = require("@nestjs/swagger");
const update_contact_dto_1 = require("./dto/update-contact.dto");
let ContactController = class ContactController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_contact_dto_1.CreateContactDto, update: update_contact_dto_1.UpdateContactDto });
        this.service = service;
    }
    async create(body) {
        return await super.create(body);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new contact' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "create", null);
ContactController = __decorate([
    swagger_1.ApiUseTags('contact'),
    common_1.Controller('private/contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
exports.ContactController = ContactController;
//# sourceMappingURL=contact.controller.js.map