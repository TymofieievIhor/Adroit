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
const contact_entity_1 = require("./contact.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const service_base_1 = require("../../common/helpers/service.base");
let ContactService = class ContactService extends service_base_1.ServiceBase {
    constructor(repository) {
        super(contact_entity_1.Contact, repository);
        this.repository = repository;
    }
    async updateByIdInTxChain(id, body, manager, owner) {
        const params = {};
        if (owner) {
            params[`${owner.name}_id`] = owner.id;
        }
        const existingContact = await this.repository.findOne({ id });
        if (existingContact) {
            await this.repository.update({ id: existingContact.id }, Object.assign(existingContact, body, params));
            return await this.repository.findOne({ id });
        }
        const contact = Object.assign(new contact_entity_1.Contact(), body, params);
        return await manager.save(contact);
    }
};
ContactService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ContactService);
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map