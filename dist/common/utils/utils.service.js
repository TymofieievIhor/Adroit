"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let UtilsService = class UtilsService {
    async setArchivedStatusById(id, body, queryBuilder, repo) {
        const q = queryBuilder('t')
            .andWhere('t.id = :id', { id });
        const item = await q.getOne();
        if (!item) {
            throw new common_1.BadRequestException('An item cannot be archived');
        }
        item.is_archived = body.archive;
        item.archived_at = body.archive ? (new Date()).toISOString() : null;
        await repo.save(Object.assign({}, item));
    }
    async modifyArrayEntities(data, service, manager, ownerData, accountId) {
        const updatePromises = [];
        const deletePromises = [];
        for (const c of data) {
            if (c.hasOwnProperty('id') && Object.keys(c).length === 1) {
                deletePromises.push(service.deleteByIdInTxChain(c.id, manager, accountId));
            }
            else {
                const id = c.id;
                delete c.id;
                updatePromises.push(service.updateByIdInTxChain(id, c, manager, ownerData));
            }
        }
        await Promise.all([...updatePromises, ...deletePromises]);
    }
};
UtilsService = __decorate([
    common_1.Injectable()
], UtilsService);
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map