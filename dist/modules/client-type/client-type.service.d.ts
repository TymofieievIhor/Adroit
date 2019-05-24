import { ServiceBase } from '../../common/helpers/service.base';
import { ClientType } from './client-type.entity';
import { Repository } from 'typeorm';
export declare class ClientTypeService extends ServiceBase<ClientType> {
    protected readonly repository: Repository<ClientType>;
    constructor(repository: Repository<ClientType>);
}
