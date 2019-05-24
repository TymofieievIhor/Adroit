import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { BASE_DELETED_PREFIX, PAGE_DEFAULT, SIZE_DEFAULT, SORT_DEFAULT, SORT_ORDER, BASE_UNIQUE_PROPS } from './constant';
import { BasicPaginationDto } from './basic-pagination.dto';
import { IResponseWithPagination } from './interfaces/reponseWithPagination.interface';
import { MISSING_RECORD } from '../error-handling/exception-messages';

export abstract class ServiceBase<T> {

    protected constructor(protected entity: any, protected repository: Repository<T>) {

    }

    async create(body: any, manager?: EntityManager | Repository<T>): Promise<T> {
        manager = manager || this.repository;
        const item = Object.assign(new this.entity(), body);
        return await manager.save(item);
    }

    async find(
        body?: any,
        pagination?: BasicPaginationDto,
        customFindWithRelations?: () => SelectQueryBuilder<T>,
        alias?: string,
    ): Promise<IResponseWithPagination<T>> {
        alias = alias || 't';
        const q = customFindWithRelations ? customFindWithRelations() : this.findByParams(body, alias);
        if (pagination && Object.keys(pagination).length) {
            this.applyPagination(q, alias, pagination);
        }
        const [items, count] = await q.getManyAndCount();
        return { items, count };
    }

    async findAllByParams(params?: any): Promise<T[]> {
        const q = this.findByParams(params);
        return await q.getMany();
    }

    async findOne(body: any): Promise<T> {
        const q = this.findByParams(body);
        return await q.getOne();
    }

    async findById(id: number, findWithRelations?: () => SelectQueryBuilder<T>): Promise<T> {
        const q = this.findByParams({ id }, 't', findWithRelations);
        return await q.getOne();
    }

    async findWithDeleted(body?: any, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<T>> {
        const alias = 't';
        const q = this.repository
            .createQueryBuilder(alias)
            .where(body || {});
        this.applyPagination(q, alias, pagination);
        const [items, count] = await q.getManyAndCount();
        return { items, count };
    }

    async updateById(id: number, body: any): Promise<T> {
        const item = await this.checkIfIsDeleted({ id });
        const updatedItem = Object.assign(item, body);
        return await this.repository.save(updatedItem);
    }

    async deleteById(id: number, accountId?: number): Promise<void> {
        const updateSet = await this.createUpdateSet(id, accountId);
        await this.repository
            .createQueryBuilder()
            .update(this.entity, updateSet)
            .where('id = :id', { id })
            .execute();
    }

    async deleteByIdInTxChain(id: number, manager: EntityManager, accountId?: number): Promise<void> {
        const updateSet = await this.createUpdateSet(id, accountId);
        await manager.update(this.entity, { id }, updateSet);
    }

    private async createUpdateSet(id: number, accountId: number) {
        let updateSet;
        updateSet = {};
        updateSet.is_deleted = true;
        updateSet.deleted_at = (new Date()).toISOString();
        updateSet.deleted_by_account_id = accountId || null;
        const item = await this.checkIfIsDeleted({ id });
        for (const prop of BASE_UNIQUE_PROPS) {
            if (item.hasOwnProperty(prop) && item[prop]) {
                updateSet[prop] = `${item[prop]}-${BASE_DELETED_PREFIX}-${Math.random().toString(36).slice(2)}`;
            }
        }
        return updateSet;
    }

    private findByParams(params, alias?: string, findWithRealations?: () => SelectQueryBuilder<T>): SelectQueryBuilder<T> {
        const q = findWithRealations ? findWithRealations() : this.repository.createQueryBuilder(alias || 't');
        return q
            .where(params || {})
            .andWhere('t.is_deleted != true');
    }

    async checkIfIsDeleted(params): Promise<T> {
        const q = this.repository
            .createQueryBuilder()
            .where(params);
        const item = Object.assign(new this.entity(), await q.getOne());

        if (item.is_deleted) {
            throw new BadRequestException(MISSING_RECORD);
        }
        return item;
    }

    protected deleteProps(obj, props) {
        for (const prop of props) {
            delete obj[prop];
        }
    }

    protected applyPagination(q: SelectQueryBuilder<T>, entityName: string, pagination: BasicPaginationDto) {
        pagination = pagination || {};
        const page = +pagination.page || PAGE_DEFAULT;
        const size = +pagination.size || SIZE_DEFAULT;
        const sort = pagination.sort || SORT_DEFAULT;
        const sortArr = sort.split(',');
        let sortBy = sortArr[0];
        let order = sortArr[1] && sortArr[1].trim().toUpperCase();
        order = (order === 'DESC' || order === 'ASC') ? order : 'DESC';
        sortBy = sortBy.includes('.') ? sortBy : `${entityName}.${sortBy}`;

        q
            .skip(page * size)
            .take(size)
            .orderBy(sortBy, order as SORT_ORDER);
    }

    convertDateTimeToDateStringFormat(dateTimeField: string | Date): string {
        if (typeof dateTimeField === 'string') {
            dateTimeField = new Date(dateTimeField);
        }
        return dateTimeField.toJSON().split('T')[0] || dateTimeField.toJSON();
    }
}
