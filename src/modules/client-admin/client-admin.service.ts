import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { ClientAdmin } from './client-admin.entity';
import { EntityManager, Repository, Transaction, TransactionManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientAdminDto } from './dto/create-client-admin.dto';
import { AccountService } from '../account/account.service';
import { UpdateClientAdminDto } from './dto/update-client-admin.dto';
import { Account } from '../account/account.entity';

@Injectable()
export class ClientAdminService extends ServiceBase<ClientAdmin> {
  constructor(@InjectRepository(ClientAdmin) protected readonly repository: Repository<ClientAdmin>,
              private accountService: AccountService) {
    super(ClientAdmin, repository);
  }

  @Transaction()
  async create(data: CreateClientAdminDto, @TransactionManager() manager?: EntityManager): Promise<ClientAdmin> {
    return await this.createInTxChain(data, manager);
  }

  async createInTxChain(data: CreateClientAdminDto, manager?: EntityManager): Promise<ClientAdmin> {
    const account = await this.accountService.create(Object.assign({}, data, {account_type_id: 10}), manager);
    const clientAdmin = Object.assign(new ClientAdmin(), {
      account_id: account.id,
      client_id: data.client_id,
      title: data.title,
    });
    return await manager.save(clientAdmin);
  }

  async updateByIdInTxChain(id: number, body: UpdateClientAdminDto, manager?: EntityManager, owner?: {name: string, id: number}): Promise<ClientAdmin> {
    const params = {};
    if (owner) {
      params[`${owner.name}_id`] = owner.id;
    }
    const existingClientAdmin = await this.repository.findOne({id});
    if (existingClientAdmin) {
      await manager.update(ClientAdmin, {id: existingClientAdmin.id}, Object.assign({}, existingClientAdmin, body, params));
      const account = await this.accountService.findById(existingClientAdmin.account_id);
      await manager.update(Account, {id: account.id}, Object.assign({}, account, body, params));
      return await this.repository.findOne({id});
    }
    return await this.createInTxChain(Object.assign(body, params) as CreateClientAdminDto, manager);
  }
}
