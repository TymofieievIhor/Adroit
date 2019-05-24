import { ServiceBase } from './service.base';
import { IDtoMap } from './interfaces/dtoMap.interface';
import { BasicPaginationDto } from './basic-pagination.dto';
import { IResponseWithPagination } from './interfaces/reponseWithPagination.interface';
export declare abstract class ControllerBase<T> {
    protected service: ServiceBase<T>;
    protected dto: IDtoMap;
    protected constructor(service: ServiceBase<T>, dto: IDtoMap);
    create(body: any, req?: any): Promise<T>;
    find(params?: any, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<T> | any>;
    findById(id: number): Promise<T>;
    updateById(id: number, body: any): Promise<T>;
    deleteById(id: number, req?: any): Promise<void>;
    private errorHandler;
    validateId(id: any): Promise<void>;
    private validateDto;
}
