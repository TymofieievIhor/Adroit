import { Repository } from 'typeorm';
import { ApiClient } from './api-client.entity';
import { ServiceBase } from '../../common/helpers/service.base';
export declare class ApiClientService extends ServiceBase<ApiClient> {
    protected readonly repository: Repository<ApiClient>;
    constructor(repository: Repository<ApiClient>);
}
