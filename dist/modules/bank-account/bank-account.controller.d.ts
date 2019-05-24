import { BankAccountService } from './bank-account.service';
import { BankAccount } from './bank-account.entity';
import { ControllerBase } from '../../common/helpers/controller.base';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
export declare class BankAccountController extends ControllerBase<BankAccount> {
    protected service: BankAccountService;
    constructor(service: BankAccountService);
    create(body: CreateBankAccountDto): Promise<BankAccount>;
}
