import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { BasicPaginationDto } from './basic-pagination.dto';
import { IResponseWithPagination } from './interfaces/reponseWithPagination.interface';
export declare abstract class ServiceBase<T> {
    protected entity: any;
    protected repository: Repository<T>;
    protected constructor(entity: any, repository: Repository<T>);
    create(body: any, manager?: EntityManager | Repository<T>): Promise<T>;
    find(body?: any, pagination?: BasicPaginationDto, customFindWithRelations?: () => SelectQueryBuilder<T>, alias?: string): Promise<IResponseWithPagination<T>>;
    findAllByParams(params?: any): Promise<T[]>;
    findOne(body: any): Promise<T>;
    findById(id: number, findWithRelations?: () => SelectQueryBuilder<T>): Promise<T>;
    findWithDeleted(body?: any, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<T>>;
    updateById(id: number, body: any): Promise<T>;
    deleteById(id: number, accountId?: number): Promise<void>;
    deleteByIdInTxChain(id: number, manager: EntityManager, accountId?: number): Promise<void>;
    private createUpdateSet;
    private findByParams;
    checkIfIsDeleted(params: any): Promise<T>;
    protected deleteProps(obj: any, props: any): void;
    protected applyPagination(q: SelectQueryBuilder<T>, entityName: string, pagination: BasicPaginationDto): void;
    convertDateTimeToDateStringFormat(dateTimeField: string | Date): string;
}
