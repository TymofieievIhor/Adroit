import { AccountType } from './account-type.entity';
import { AccountTypeService } from './account-type.service';
import { CreateAccountTypeDto } from './dto/create-account-type.dto';
import { ControllerBase } from '../../common/helpers/controller.base';
export declare class AccountTypeController extends ControllerBase<AccountType> {
    protected service: AccountTypeService;
    constructor(service: AccountTypeService);
    create(body: CreateAccountTypeDto): Promise<AccountType>;
}
