import {Injectable} from '@nestjs/common';
import {AccountType} from './account-type.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ServiceBase} from '../../common/helpers/service.base';

@Injectable()
export class AccountTypeService extends ServiceBase<AccountType>{
    constructor(@InjectRepository(AccountType) protected readonly repository: Repository<AccountType>){
        super(AccountType, repository);
    }
}