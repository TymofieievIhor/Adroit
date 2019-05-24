"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constant_1 = require("./constant");
const exception_messages_1 = require("../error-handling/exception-messages");
class ServiceBase {
    constructor(entity, repository) {
        this.entity = entity;
        this.repository = repository;
    }
    async create(body, manager) {
        manager = manager || this.repository;
        const item = Object.assign(new this.entity(), body);
        return await manager.save(item);
    }
    async find(body, pagination, customFindWithRelations, alias) {
        alias = alias || 't';
        const q = customFindWithRelations ? customFindWithRelations() : this.findByParams(body, alias);
        if (pagination && Object.keys(pagination).length) {
            this.applyPagination(q, alias, pagination);
        }
        const [items, count] = await q.getManyAndCount();
        return { items, count };
    }
    async findAllByParams(params) {
        const q = this.findByParams(params);
        return await q.getMany();
    }
    async findOne(body) {
        const q = this.findByParams(body);
        return await q.getOne();
    }
    async findById(id, findWithRelations) {
        const q = this.findByParams({ id }, 't', findWithRelations);
        return await q.getOne();
    }
    async findWithDeleted(body, pagination) {
        const alias = 't';
        const q = this.repository
            .createQueryBuilder(alias)
            .where(body || {});
        this.applyPagination(q, alias, pagination);
        const [items, count] = await q.getManyAndCount();
        return { items, count };
    }
    async updateById(id, body) {
        const item = await this.checkIfIsDeleted({ id });
        const updatedItem = Object.assign(item, body);
        return await this.repository.save(updatedItem);
    }
    async deleteById(id, accountId) {
        const updateSet = await this.createUpdateSet(id, accountId);
        await this.repository
            .createQueryBuilder()
            .update(this.entity, updateSet)
            .where('id = :id', { id })
            .execute();
    }
    async deleteByIdInTxChain(id, manager, accountId) {
        const updateSet = await this.createUpdateSet(id, accountId);
        await manager.update(this.entity, { id }, updateSet);
    }
    async createUpdateSet(id, accountId) {
        let updateSet;
        updateSet = {};
        updateSet.is_deleted = true;
        updateSet.deleted_at = (new Date()).toISOString();
        updateSet.deleted_by_account_id = accountId || null;
        const item = await this.checkIfIsDeleted({ id });
        for (const prop of constant_1.BASE_UNIQUE_PROPS) {
            if (item.hasOwnProperty(prop) && item[prop]) {
                updateSet[prop] = `${item[prop]}-${constant_1.BASE_DELETED_PREFIX}-${Math.random().toString(36).slice(2)}`;
            }
        }
        return updateSet;
    }
    findByParams(params, alias, findWithRealations) {
        const q = findWithRealations ? findWithRealations() : this.repository.createQueryBuilder(alias || 't');
        return q
            .where(params || {})
            .andWhere('t.is_deleted != true');
    }
    async checkIfIsDeleted(params) {
        const q = this.repository
            .createQueryBuilder()
            .where(params);
        const item = Object.assign(new this.entity(), await q.getOne());
        if (item.is_deleted) {
            throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
        }
        return item;
    }
    deleteProps(obj, props) {
        for (const prop of props) {
            delete obj[prop];
        }
    }
    applyPagination(q, entityName, pagination) {
        pagination = pagination || {};
        const page = +pagination.page || constant_1.PAGE_DEFAULT;
        const size = +pagination.size || constant_1.SIZE_DEFAULT;
        const sort = pagination.sort || constant_1.SORT_DEFAULT;
        const sortArr = sort.split(',');
        let sortBy = sortArr[0];
        let order = sortArr[1] && sortArr[1].trim().toUpperCase();
        order = (order === 'DESC' || order === 'ASC') ? order : 'DESC';
        sortBy = sortBy.includes('.') ? sortBy : `${entityName}.${sortBy}`;
        q
            .skip(page * size)
            .take(size)
            .orderBy(sortBy, order);
    }
    convertDateTimeToDateStringFormat(dateTimeField) {
        if (typeof dateTimeField === 'string') {
            dateTimeField = new Date(dateTimeField);
        }
        return dateTimeField.toJSON().split('T')[0] || dateTimeField.toJSON();
    }
}
exports.ServiceBase = ServiceBase;
//# sourceMappingURL=service.base.js.map