import { Injectable } from '@nestjs/common';
import { Guardian } from './guardian.entity';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { AccountService } from '../account/account.service';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { Account } from '../account/account.entity';
import { ServiceBase } from '../../common/helpers/service.base';
import { UpdateGuardianDto } from './dto/update-guardian.dto';

@Injectable()
export class GuardianService extends ServiceBase<Guardian> {
  constructor(@InjectRepository(Guardian) protected repository: Repository<Guardian>,
              private accountService: AccountService,
              ) {
    super(Guardian, repository);
  }

  async createInTxChain(data: CreateGuardianDto, manager?: EntityManager): Promise<Guardian> {
    const guardianAccount = await this.accountService.create(Object.assign(data, {account_type_id: 11}), manager);
    return await manager.save(
      Object.assign(
        new Guardian(),
        {account_id: guardianAccount.id, passenger_id: data.passenger_id, relationship: data.relationship},
      ),
    );

  }

  async updateByIdInTxChain(id: number, body: UpdateGuardianDto, manager?: EntityManager, owner?: {name: string, id: number}): Promise<Guardian> {
    const params = {};
    if (owner) {
      params[`${owner.name}_id`] = owner.id;
    }
    const existingGuardian = await this.repository.findOne({id});
    if (existingGuardian) {
      await this.repository.update({id: existingGuardian.id}, Object.assign(existingGuardian, body, params));
      return await this.repository.findOne({id});
    }
    return await this.createInTxChain(Object.assign(body, params) as CreateGuardianDto, manager);
  }

  async findById(id: number): Promise<Guardian> {
    return await super.findById(id, () => this.findWithRelations('t'));
  }

  async find(data?: any, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Guardian>> {
    return await super.find(data, pagination, () => this.findWithRelations('t'));
  }

  private findWithRelations(alias: string): SelectQueryBuilder<Guardian> {
    return this.repository.createQueryBuilder(alias)
     .leftJoinAndMapOne(`${alias}.account`, Account, 'account', `account.id = ${alias}.account_id AND account.is_deleted != true`)
     .where(`${alias}.is_deleted != true`);
  }

}
