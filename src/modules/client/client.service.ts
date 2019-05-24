import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { Client } from './client.entity';
import { EntityManager, Repository, SelectQueryBuilder, Transaction, TransactionManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { LocationService } from '../location/location.service';
import { BankAccountService } from '../bank-account/bank-account.service';
import { AccountService } from '../account/account.service';
import { ClientTypeService } from '../client-type/client-type.service';
import { Account } from '../account/account.entity';
import { BankAccount } from '../bank-account/bank-account.entity';
import { LocationEntity } from '../location/location.entity';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { ContactService } from '../contact/contact.service';
import { Contact } from '../contact/contact.entity';
import { FileService } from '../file/file.service';
import { ClientFile } from '../file/entities/client-file.entity';
import { UpdateClientDto } from './dto/update-client.dto';
import { FileUtils } from '../file/fileUtils';
import { SetArchivedStatusDto } from './dto/set-archived-status.dto';
import { UtilsService } from '../../common/utils/utils.service';
import { ClientAdminService } from '../client-admin/client-admin.service';
import { Passenger } from '../passenger/passenger.entity';
import { ClientAdmin } from '../client-admin/client-admin.entity';
import { ClientType } from '../client-type/client-type.entity';
import { ServiceContractService } from '../service-contract/service-contract.service';
import { ServiceContract } from '../service-contract/entities/service-contract.entity';
import { ServiceContractPricing } from '../service-contract/entities/service-contract-pricing.entity';
import { RideRoute } from '../ride-management/entities/ride-route.entity';
import { RideClient } from '../ride-management/entities/ride-client.entity';

@Injectable()
export class ClientService extends ServiceBase<Client> {
  constructor(
    @InjectRepository(Client) protected readonly repository: Repository<Client>,
    private locationService: LocationService,
    private bankAccountService: BankAccountService,
    private accountService: AccountService,
    private clientTypeService: ClientTypeService,
    private contactService: ContactService,
    private fileService: FileService,
    private fileUtils: FileUtils,
    private utilsService: UtilsService<Client>,
    private clientAdminService: ClientAdminService,
    private serviceContractService: ServiceContractService,
  ) {
    super(Client, repository);
  }

  @Transaction()
  async create(data: CreateClientDto, @TransactionManager() manager?: EntityManager): Promise<Client> {
    const client = Object.assign(new Client(), data.client);
    const location = await this.locationService.create(Object.assign({}, data.location), manager, 'client');
    const account = await this.accountService.create(Object.assign({}, data.owner_account, {account_type_id: 9}), manager);
    let bankAccount = await this.bankAccountService.create(Object.assign({}, data.bank_account), manager);
    client.location_id = location.id;
    client.owner_account_id = account.id;
    client.bank_account_id = bankAccount.id;

    const clientSaved = await manager.save(client);

    const contractPromises = [];
    for (const c of data.contracts) {
      contractPromises.push(this.serviceContractService.createInTxChain(Object.assign(c, {client_id: clientSaved.id}), manager));
    }
    await Promise.all(contractPromises);

    if (data.admins && data.admins.length) {
      const adminPromises = [];
      for (const a of data.admins) {
        adminPromises.push(this.clientAdminService.createInTxChain(Object.assign({}, a, {client_id: clientSaved.id}), manager));
      }
      await Promise.all(adminPromises);
    }
    await this.locationService.createLink({name: 'client', id: clientSaved.id}, clientSaved.location_id, manager);
    if (data.contacts && data.contacts.length) {
      const contactPromises = [];
      for (const c of data.contacts) {
        contactPromises.push(this.contactService.create(Object.assign({}, c, {client_id: clientSaved.id}), manager));
      }
      await Promise.all(contactPromises);
    }
    if (data.files && data.files.length) {
      await this.fileUtils.modifyFileLink(data.files, {name: 'client', id: clientSaved.id}, data.account_id, manager);
    }
    bankAccount = await manager.save(BankAccount, Object.assign(bankAccount, {client_id: clientSaved.id}));
    clientSaved.bank_account = bankAccount;
    clientSaved.owner_account = account;
    clientSaved.location = location;
    clientSaved.client_type = await this.clientTypeService.findOne({id: clientSaved.client_type_id});
    clientSaved.contacts = await this.contactService.findAllByParams({client_id: clientSaved.id});
    clientSaved.files = (await this.fileService.findFilesByOwner(clientSaved.id, 'client')).items;
    return clientSaved;
  }

  async find(body?: any, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Client>> {
    const alias = 't';
    const q = this.findWithRelations(alias);
    const patternMatchingFields = ['name', 'phone_number'];
    for (const key of Object.keys(body)) {
      if (patternMatchingFields.includes(key)) {
        q.andWhere(`${alias}.${key} LIKE '%${body[key]}%'`);
      } else if (key === 'owner_account') {
        q.andWhere(`owner_account.first_name LIKE  '%${body[key]}%' OR owner_account.last_name LIKE '%${body[key]}%'`);
      }
    }
    // q
    //   .andWhere(`${alias}.is_archived != true`);
    const result = await super.find(body, pagination, () => q);
    this.addContractsAndPricing(result.items);
    return result;
  }

  async findById(id: number): Promise<Client> {
    const q = this.findWithRelations('t')
      .andWhere('t.id = :id', {id});
      // .andWhere(`t.is_archived != true`);
    const client = await q.getOne();
    this.addContractsAndPricing([client]);
    return client;
  }

  async findContacts(id: number, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Contact>> {
    return this.contactService.find({client_id: id}, pagination);
  }

  @Transaction()
  async updateById(id: number, data: UpdateClientDto, @TransactionManager() manager?: EntityManager): Promise<Client> {
    let client = await manager.findOne(Client, {id, is_deleted: false, is_archived: false});
    if (!client) {
      throw new BadRequestException('The client does not exist');
    }
    if (data.client && Object.keys(data.client).length) {
      for (const [field, value] of Object.entries(data.client)) {
        client[field] = value;
      }
    }
    let newLoc;
    let newBankAcc;
    if (data.location && Object.keys(data.location).length) {
      const location = await this.locationService.findById(client.location_id);
      newLoc = await this.locationService.updateByIdInTxChain(location.id, data.location, {name: 'client', id: client.id}, manager);
      client.location_id = newLoc.id;
    }
    if (data.bank_account && Object.keys(data.bank_account).length) {
      const bankAccount = await this.bankAccountService.findById(client.bank_account_id);
      newBankAcc = await this.bankAccountService.updateByIdInTxChain(bankAccount.id, data.bank_account, manager);
      client.bank_account_id = newBankAcc.id;
    }
    if (data.contacts && data.contacts.length) {
      const updatePromises = [];
      const deletePromises = [];
      for (const c of data.contacts) {
        if (c.hasOwnProperty('id') && Object.keys(c).length === 1) {
          deletePromises.push(this.contactService.deleteById(c.id, data.account_id));
        } else {
          updatePromises.push(this.contactService.updateByIdInTxChain(c.id, c, manager, {name: 'client', id: client.id}));
        }
      }
      await Promise.all([...updatePromises, ...deletePromises]);
    }
    if (data.admins && data.admins.length) {
      await this.utilsService.modifyArrayEntities(data.admins, this.clientAdminService, manager, {name: 'client', id: client.id}, data.account_id);
    }
    if (data.files) {
      await this.fileUtils.modifyFileLink(data.files, {name: 'client', id: client.id}, data.account_id, manager);
    }
    if (data.contracts && data.contracts.length) {
      const updatePromises = [];
      const amendPromises = [];
      for (const c of data.contracts) {
        if (c.contract && c.contract.hasOwnProperty('id') && Object.keys(c.contract).length === 1) {
          amendPromises.push(this.serviceContractService.setStatusByIdInTxChain(c.contract.id, 'amended', manager));
        } else {
          updatePromises.push(this.serviceContractService.updateInTxChain(c.contract.id, Object.assign(c, {client_id: id}), manager));
        }
      }
      await Promise.all([...updatePromises, ...amendPromises]);
    }

    client = await manager.save(client);
    client.id = id;
    if (newLoc) {
      client.location = newLoc;
    }
    if (newBankAcc) {
      client.bank_account = newBankAcc;
    }
    client.contacts = await manager.find(Contact, {is_deleted: false, client_id: client.id});
    client.files = (await this.fileService.findFilesByOwner(client.id, 'client')).items;
    return client;
  }

  async setArchivedStatusById(id: number, body: SetArchivedStatusDto): Promise<void> {
    await this.utilsService.setArchivedStatusById(id, body, (alias) => this.findWithRelations(alias), this.repository);
  }

  async getServiceContractsById(id: number,  pagination?: BasicPaginationDto): Promise<IResponseWithPagination<ServiceContract>> {
    return await this.serviceContractService.find({client_id: id}, pagination);
  }

  async deleteById(id: number): Promise<void> {
    const q = this.findWithRelations('t');
    q.andWhere('t.is_archived != true');

    const client = await q.getOne();

    if (!client) {
      throw new BadRequestException('A client cannot be deleted/archived');
    }

    let updateSet;

    if (client.contacts && client.contacts.length) {
      updateSet = { // TODO: archive if there are passengers/recurring trips
        is_archived: true,
        archived_at: (new Date()).toISOString(),
      };
    } else {
      updateSet = {
        is_deleted: true,
        deleted_at: (new Date()).toISOString(),
      };
    }
    await this.repository
      .createQueryBuilder()
      .update(updateSet)
      .where('id = :id', {id})
      .execute();
  }

  private addContractsAndPricing(items): void {
    if (items && items.length) {
      for (const item of items) {
        if (item && Object.keys(item).length) {
          item.contractsWithPricing = [];
          for (const contract of item.contracts) {
            const pricing = Object.assign({}, contract.pricing);
            delete contract.pricing;
            const contractWithPricing = {
              pricing,
              contract,
            };
            item.contractsWithPricing.push(contractWithPricing);
          }
          delete item.contracts;
        }
      }
    }

  }
  private findWithRelations(alias: string): SelectQueryBuilder<Client> {
    return this.repository.createQueryBuilder(alias)
      .leftJoinAndMapOne(`${alias}.owner_account`, Account, 'owner_account', `owner_account.id = ${alias}.owner_account_id`)
      .leftJoinAndMapOne(`${alias}.bank_account`, BankAccount, 'bank_account', `bank_account.id = ${alias}.bank_account_id`)
      .leftJoinAndMapOne(`${alias}.location`, LocationEntity, 'location', `location.id = ${alias}.location_id`)
      .leftJoinAndMapOne(`${alias}.client_type`, ClientType, 'client_type', `client_type.id = ${alias}.client_type_id`)
      .leftJoinAndMapMany(`${alias}.contacts`, Contact, 'contact', `contact.client_id = ${alias}.id AND contact.is_deleted != true`)
      .leftJoinAndMapMany(`${alias}.files`, ClientFile, 'file', `${alias}.id = file.client_id AND file.is_deleted != true`)
      .leftJoinAndMapMany(`${alias}.passengers`, Passenger, 'passenger', `${alias}.id = passenger.client_id AND passenger.is_deleted != true`)
      .leftJoinAndMapMany(`${alias}.admins`, ClientAdmin, 'admin', `${alias}.id = admin.client_id AND admin.is_deleted != true`)
      .leftJoinAndMapOne('admin.account', Account, 'adm_acc', `adm_acc.id = admin.account_id`)
      .leftJoinAndMapMany(`${alias}.contracts`, ServiceContract, 'contract', `${alias}.id = contract.client_id AND contract.is_deleted != true AND contract.service_contract_status_id != 4`)
      .leftJoinAndMapOne(`contract.pricing`, ServiceContractPricing, 'pr', `contract.id = pr.service_contract_id`)
      .leftJoin(RideClient, 'rideClient',  `${alias}.id = rideClient.client_id`)
      .leftJoinAndMapMany( `${alias}.ride_routes`, RideRoute, 'rideRoute', 'rideClient.ride_route_id = rideRoute.id')
      .where(`${alias}.is_deleted != true`)
      .andWhere(`owner_account.is_deleted != true`);
  }
}
