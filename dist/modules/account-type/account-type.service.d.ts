import { AccountType } from './account-type.entity';
import { Repository } from 'typeorm';
import { ServiceBase } from '../../common/helpers/service.base';
export declare class AccountTypeService extends ServiceBase<AccountType> {
    protected readonly repository: Repository<AccountType>;
    constructor(repository: Repository<AccountType>);
}
