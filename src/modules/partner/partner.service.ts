import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, Repository, SelectQueryBuilder, Transaction, TransactionManager } from 'typeorm';
import { Partner } from './partner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceBase } from '../../common/helpers/service.base';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { LocationService } from '../location/location.service';
import { BankAccountService } from '../bank-account/bank-account.service';
import { AccountService } from '../account/account.service';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Account } from '../account/account.entity';
import { BankAccount } from '../bank-account/bank-account.entity';
import { LocationEntity } from '../location/location.entity';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { FileService } from '../file/file.service';
import { Driver } from '../driver/driver.entity';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { PartnerFile } from '../file/entities/partner-file.entity';
import { FileUtils } from '../file/fileUtils';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';
import { UtilsService } from '../../common/utils/utils.service';
import { FindPartnerDto } from './dto/find-partner.dto';

@Injectable()
export class PartnerService extends ServiceBase<Partner> {
    constructor(@InjectRepository(Partner) protected readonly repository: Repository<Partner>,
                private locationService: LocationService,
                private bankAccountService: BankAccountService,
                private accountService: AccountService,
                private fileService: FileService,
                private fileUtils: FileUtils,
                private utilsService: UtilsService<Partner>,
                ) {
        super(Partner, repository);
    }

    @Transaction()
    async create(data: CreatePartnerDto, @TransactionManager() manager?: EntityManager): Promise<Partner> {
        const partner = Object.assign(new Partner(), data.partner);
        const location = await this.locationService.create(data.location, manager, 'partner');
        const account = await this.accountService.create(Object.assign({}, data.owner_account, {account_type_id: 7}), manager);
        let bankAccount: BankAccount;
        if (data.bank_account) {
            bankAccount = await this.bankAccountService.create(data.bank_account, manager);
            partner.bank_account_id = bankAccount.id;
        }
        partner.location_id = location.id;
        partner.owner_account_id = account.id;
        const partnerSaved = await manager.save(partner);
        if (data.bank_account) {
            bankAccount = await manager.save(BankAccount, Object.assign(bankAccount, { partner_id: partnerSaved.id }));
        }
        await this.locationService.createLink({name: 'partner', id: partnerSaved.id}, partner.location_id, manager);
        if (data.files && data.files.length) {
          await this.fileUtils.modifyFileLink(data.files, {name: 'partner', id: partnerSaved.id}, data.account_id, manager);
        }
        partnerSaved.location = location;
        partnerSaved.bank_account = bankAccount || null;
        partnerSaved.owner_account = account;
        partnerSaved.files = (await this.fileService.findFilesByOwner(partnerSaved.id, 'partner')).items;
        return partnerSaved;
    }

    @Transaction()
    async updateById(id: number, data: UpdatePartnerDto, @TransactionManager() manager?: EntityManager): Promise<Partner>  {
        let partner = await manager.findOne(Partner, {id, is_deleted: false, is_archived: false});
        if (!partner) {
            throw new BadRequestException('The partner does not exist');
        }
        if (data.partner && Object.keys(data.partner).length) {
          if (data.partner.name) {
            partner.name = data.partner.name;
          }
          if (data.partner.tin) {
            partner.tin = data.partner.tin;
          }
        }
        let newLoc;
        let newBankAcc;
        if (data.location && Object.keys(data.location).length) {
            const location = await this.locationService.findById(partner.location_id);
            newLoc = await this.locationService.updateByIdInTxChain(location.id, data.location, {name: 'partner', id: partner.id}, manager);
            partner.location_id = newLoc.id;
        }
        if (data.bank_account && Object.keys(data.bank_account).length) {
            const bankAccount = await this.bankAccountService.findById(partner.bank_account_id);
            newBankAcc = await this.bankAccountService.updateByIdInTxChain(bankAccount.id, data.bank_account, manager);
            partner.bank_account_id = newBankAcc.id;
        }
        partner = await manager.save(partner);
        partner.id = id;
        if (data.files) {
            await this.fileUtils.modifyFileLink(data.files, {name: 'partner', id: partner.id}, data.account_id, manager);
        }
        if (newLoc) {
            partner.location = newLoc;
        }
        if (newBankAcc) {
            partner.bank_account = newBankAcc;
        }
        partner.files = (await this.fileService.findFilesByOwner(partner.id, 'partner')).items;
        return partner;
    }

    async findById(id: number): Promise<Partner> {
        const q = this.findWithRelations('t')
          .andWhere('t.id = :id', {id});
        return await q.getOne();
    }

    async find(params?: FindPartnerDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Partner>> {
        const alias = 't';
        const customFindWithRelations = this.findWithRelations(alias);

        if (params && params.search) {
            if (!isNaN(+params.search)) {
              customFindWithRelations
                .andWhere(`${alias}.id = :id`, { id: +params.search })
                .orWhere(`owner_account.phone_number LIKE '%${+params.search}%'`)
                .orWhere(`${alias}.tin LIKE '%${+params.search}%'`);
            } else {
              customFindWithRelations
                .andWhere(`owner_account.first_name LIKE '%${params.search}%'`)
                .orWhere(`owner_account.last_name LIKE '%${params.search}%'`)
                .orWhere(`${alias}.name LIKE '%${params.search}%'`)
                .orWhere(`owner_account.phone_number LIKE '%${+params.search}%'`);
            }
        }
        return await super.find(params, pagination, () => customFindWithRelations, 't');
    }

    async deleteById(id: number): Promise<void> {
        const q = this.findWithRelations('t');
        q.andWhere('t.is_archived != true');
        const partner = await q.getOne();
        if (!partner) {
          throw new BadRequestException('A partner cannot be deleted/archived');
        }
        let updateSet;
        if (partner.drivers && partner.drivers.length) {
            updateSet = {
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

    async setArchivedStatusById(id: number, body: SetArchivedStatusDto): Promise<void> {
      await this.utilsService.setArchivedStatusById(id, body, (alias) => this.findWithRelations(alias), this.repository);
    }

    private findWithRelations(alias: string): SelectQueryBuilder<Partner> {
        return this.repository.createQueryBuilder(alias)
          .leftJoinAndMapOne(`${alias}.owner_account`, Account, 'owner_account', `owner_account.id = ${alias}.owner_account_id`)
          .leftJoinAndMapOne(`${alias}.bank_account`, BankAccount, 'bank_account', `bank_account.id = ${alias}.bank_account_id`)
          .leftJoinAndMapOne(`${alias}.location`, LocationEntity, 'location', `location.id = ${alias}.location_id`)
          .leftJoinAndMapMany(`${alias}.drivers`, Driver, 'driver', `driver.partner_id = ${alias}.id`)
          .leftJoinAndMapMany(`${alias}.files`, PartnerFile, 'file', `${alias}.id = file.partner_id AND file.is_deleted != true`)
          .where(`${alias}.is_deleted != true`)
          .andWhere(`owner_account.is_deleted != true`);
    }
}