import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { Passenger } from './passenger.entity';
import { EntityManager, Repository, SelectQueryBuilder, Transaction, TransactionManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { LocationService } from '../location/location.service';
import { ContactService } from '../contact/contact.service';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { GuardianService } from '../guardian/guardian.service';
import { LocationEntity } from '../location/location.entity';
import { Guardian } from '../guardian/guardian.entity';
import { Account } from '../account/account.entity';
import { Contact } from '../contact/contact.entity';
import { UpdateContactDto } from '../contact/dto/update-contact.dto';
import { UpdateGuardianDto } from '../guardian/dto/update-guardian.dto';
import { Client } from '../client/client.entity';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';
import { UtilsService } from '../../common/utils/utils.service';
import { LocationLink } from '../location/location-link.entity';
import { FindPassengerParamsDto } from './dto/find-passenger-params.dto';

@Injectable()
export class PassengerService extends ServiceBase<Passenger> {
  constructor(@InjectRepository(Passenger) protected repository: Repository<Passenger>,
              private locationService: LocationService,
              private contactService: ContactService,
              private guardianService: GuardianService,
              private utilsService: UtilsService<Passenger>,
  ) {
    super(Passenger, repository);
  }

  @Transaction()
  async create(data: CreatePassengerDto, @TransactionManager() manager?: EntityManager): Promise<Passenger> {
    data.passenger.date_of_birth = super.convertDateTimeToDateStringFormat(data.passenger.date_of_birth);
    const passenger = Object.assign(new Passenger(), data.passenger);
    const locationIds: number[] = [];
    for (const loc of data.locations) {
      const location = await this.locationService.create(loc, manager);
      locationIds.push(location.id);
    }
    const passengerSaved = await manager.save(passenger);

    if (data.contacts) {
      const contactPromises = [];
      for (const c of data.contacts) {
        contactPromises.push(this.contactService.create(Object.assign({}, c, {}, { passenger_id: passengerSaved.id }), manager));
      }
      await Promise.all(contactPromises);
    }

    const passengerAddrPromises = [];
    for (const id of locationIds) {
      passengerAddrPromises.push(this.locationService.createLink({ name: 'passenger', id: passengerSaved.id }, id, manager));
    }
    await Promise.all(passengerAddrPromises);
    if (data.guardians && data.guardians.length) {
      const guardians = [];
      for (const g of data.guardians) {
        guardians.push(this.guardianService.createInTxChain(Object.assign(g, { passenger_id: passengerSaved.id }), manager));
      }
      await Promise.all(guardians);
    }
    return passengerSaved;
  }

  @Transaction()
  async updateById(id: number, data: UpdatePassengerDto, @TransactionManager() manager?: EntityManager): Promise<Passenger> {
    const passenger = await manager.findOne(Passenger, { id, is_deleted: false, is_archived: false});
    if (!passenger) {
      throw new BadRequestException('The passenger does not exist');
    }
    if (data.locations && data.locations.length) {
      for (const loc of data.locations) {
        if (loc.hasOwnProperty('id') && Object.keys(loc).length === 1) {
          await this.locationService.deleteLinkByLocIdInTxChain(loc.id, manager);
        } else {
          const location = await this.locationService.findById(loc.id);
          let newLoc;
          if (!location) {
            newLoc = await this.locationService.create(loc, manager);
            await this.locationService.createLink({ name: 'passenger', id }, newLoc.id, manager);
          } else {
            newLoc = await this.locationService.updateByIdInTxChain(location.id, loc, { name: 'passenger', id: passenger.id }, manager);
          }
        }
      }
    }
    let passengerSaved;
    if (data.passenger && Object.keys(data.passenger).length) {
      passengerSaved = await manager.save(Object.assign(passenger, data.passenger));
    }
    if (data.contacts && data.contacts.length) {
      await this.modifyContactsGuardians(data.contacts, this.contactService, manager, {name: 'passenger', id: passenger.id}, data.account_id);
    }
    if (data.guardians && data.guardians.length) {
      await this.modifyContactsGuardians(data.guardians, this.guardianService, manager, {name: 'passenger', id: passenger.id}, data.account_id);
    }
    return passengerSaved || passenger;
  }

  async findById(id: number): Promise<Passenger> {
    return await super.findById(id, () => this.findWithRelations('t'));
  }

  async find(body?: FindPassengerParamsDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Passenger>> {
    const alias = 't';
    const customFindWithRelations = this.findWithRelations(alias);
    const passengerParams = ['first_name', 'last_name', 'type'];

    for (const param of Object.keys(body)) {
      if (passengerParams.includes(param)) {
        customFindWithRelations
          .andWhere(`${alias}.${param} LIKE '%${body[param]}%'`);
      } else if (param === 'client_id') {
        customFindWithRelations
          .andWhere(`cl.id = :id`, {id: body.client_id});
      } else if (param === 'paying_client') {
        customFindWithRelations
          .andWhere(`cl.name LIKE '%${body.paying_client}%'`);
      }
    }

    return await super.find(body, pagination, () => customFindWithRelations);
  }

  private async modifyContactsGuardians(data: UpdateContactDto[] | UpdateGuardianDto[], service, manager: EntityManager, ownerData: {name: string, id: number}, accountId: number): Promise<void> {
    const updatePromises = [];
    const deletePromises = [];
    for (const c of data) {
      if (c.hasOwnProperty('id') && Object.keys(c).length === 1) {
        deletePromises.push(service.deleteByIdInTxChain(c.id, manager, accountId));
      } else {
        updatePromises.push(service.updateByIdInTxChain(c.id, c, manager, ownerData));
      }
    }
    await Promise.all([...updatePromises, ...deletePromises]);
  }

  async setArchivedStatusById(id: number, body: SetArchivedStatusDto): Promise<void> {
    await this.utilsService.setArchivedStatusById(id, body, (alias) => this.findWithRelations(alias), this.repository);
  }

  async findPassengersByClientId(clientId: number): Promise<Passenger[]> {
    return await this.repository.find({client_id: clientId, is_deleted: false, is_archived: false});
  }

  private findWithRelations(alias: string): SelectQueryBuilder<Passenger> {
    return this.repository.createQueryBuilder(alias)
    .leftJoinAndMapMany(`${alias}.passengerAddressLink`, LocationLink, 'address', `address.passenger_id = ${alias}.id AND address.is_deleted != true`)
     .leftJoinAndMapOne(`address.location`, LocationEntity, 'l', `l.id = address.location_id`)
      .leftJoinAndMapMany(`${alias}.guardians`, Guardian, 'g', `g.passenger_id = ${alias}.id AND g.is_deleted != true`)
      .leftJoinAndMapOne('g.account', Account, 'a', 'a.id = g.account_id AND (a.is_deleted != true AND a.is_blocked != true)')
      .leftJoinAndMapMany(`${alias}.contacts`, Contact, 'c', `c.passenger_id = ${alias}.id AND c.is_deleted != true`)
      .leftJoinAndMapOne(`${alias}.client`, Client, 'cl', `cl.id = ${alias}.client_id AND cl.is_deleted != true`)
      .where(`${alias}.is_deleted != true`);
  }
}
