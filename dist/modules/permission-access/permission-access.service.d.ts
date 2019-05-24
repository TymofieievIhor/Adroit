import { ServiceBase } from '../../common/helpers/service.base';
import { PermissionAccess } from './permission-access.entity';
import { Repository } from 'typeorm';
export declare class PermissionAccessService extends ServiceBase<PermissionAccess> {
    protected readonly repository: Repository<PermissionAccess>;
    constructor(repository: Repository<PermissionAccess>);
}
