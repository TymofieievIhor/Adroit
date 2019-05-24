import { EntityManager, Repository } from 'typeorm';
import { BankAccount } from './bank-account.entity';
import { ServiceBase } from '../../common/helpers/service.base';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
export declare class BankAccountService extends ServiceBase<BankAccount> {
    protected readonly repository: Repository<BankAccount>;
    constructor(repository: Repository<BankAccount>);
    create(data: CreateBankAccountDto, manager?: EntityManager | Repository<BankAccount>): Promise<BankAccount>;
    updateById(id: number, data: UpdateBankAccountDto, manager?: EntityManager): Promise<BankAccount>;
    updateByIdInTxChain(id: number, data: UpdateBankAccountDto, manager?: EntityManager): Promise<BankAccount>;
}
