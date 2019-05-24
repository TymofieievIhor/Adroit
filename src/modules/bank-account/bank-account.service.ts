import {Injectable} from '@nestjs/common';
import { EntityManager, Repository, Transaction, TransactionManager } from 'typeorm';
import {BankAccount} from './bank-account.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {ServiceBase} from '../../common/helpers/service.base';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BASE_ENTITY_PROPS } from '../../common/helpers/constant';

@Injectable()
export class BankAccountService extends ServiceBase<BankAccount> {
    constructor(@InjectRepository(BankAccount) protected readonly repository: Repository<BankAccount>) {
        super(BankAccount, repository);
    }

    async create(data: CreateBankAccountDto, manager?: EntityManager | Repository<BankAccount>): Promise<BankAccount> {
        return await super.create(data, manager);
    }

    @Transaction()
    async updateById(id: number, data: UpdateBankAccountDto, @TransactionManager() manager?: EntityManager): Promise<BankAccount> {
        return await this.updateByIdInTxChain(id, data, manager);
    }

    async updateByIdInTxChain(id: number, data: UpdateBankAccountDto, manager?: EntityManager): Promise<BankAccount> {
      const bankAccount = await super.checkIfIsDeleted({id});
      const updatedBankAccount = Object.assign({}, bankAccount, data);

      for (const prop of BASE_ENTITY_PROPS) {
        delete updatedBankAccount[prop];
      }

      bankAccount.deleted_at = (new Date()).toISOString();
      bankAccount.is_deleted = true;
      await manager.save(bankAccount);
      return await manager.save(Object.assign(new BankAccount(), updatedBankAccount));
    }
}