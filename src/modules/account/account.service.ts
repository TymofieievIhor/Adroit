import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { Account } from './account.entity';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import * as crypto from 'crypto';
import { RANDOM_BYTES_SIZE } from '../../common/helpers/auth/constants';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { AccountType } from '../account-type/account-type.entity';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { DUPLICATE_ENTRY_EMAIL, DUPLICATE_ENTRY_PHONE_NUM } from '../../common/error-handling/exception-messages';
import { CustomError } from '../../common/error-handling/custom-error';
import { SetAccountBlockStatusDto } from './dto/set-account-block-status.dto';
import { FindAccountDto } from './dto/find-account.dto';
import {
  EXC_ACCOUNT_NOT_EXISTS,
  EXC_ACCOUNT_OLD_PASSWORD_MISMATCH,
  EXC_NEW_PASSWORD_NOT_SECURE,
  EXC_NEW_PASSWORD_THE_SAME,
} from './constant';
import { extractIpAddress } from '../../common/helpers/function';
import {
  RESET_PASSWORD_EMAIL_HTML,
  DEFAULT_PASSWORD,
  FROM_EMAIL,
  RESET_PASSWORD_EMAIL_SUBJECT,
} from '../../common/helpers/constant';
import {sendMail} from '../../common/mailer/transporter';
import { UpdateAccountPasswordDto } from './dto/update-account-password.dto';
import { isPasswordSecureEnough } from '../../common/helpers/auth/function';

@Injectable()
export class AccountService extends ServiceBase<Account>{
  constructor(@InjectRepository(Account) protected readonly repository: Repository<Account>,
  ) {
    super(Account, repository);
  }

  async findByEmail(email: string): Promise<Account> {
    return await this.repository.findOne({ email });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Account> {
    return await this.repository.findOne({ phone_number: phoneNumber });
  }

  async find(params?: FindAccountDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Account>> {
    const customFindWithRelations = this.findWithRelations('t');

    if (params && params.search) {
      if (!isNaN(+params.search)) {
        customFindWithRelations
          .andWhere(`t.id = :id`, { id: +params.search })
          .orWhere(`t.phone_number LIKE '%${+params.search}%'`);
      } else {
        customFindWithRelations
          .andWhere(`account_type.name LIKE '%${params.search}%'`)
          .orWhere(`t.phone_number LIKE '%${+params.search}%'`)
          .orWhere(`t.first_name LIKE '%${params.search}%'`)
          .orWhere(`t.last_name LIKE '%${params.search}%'`)
          .orWhere(`t.email LIKE '%${params.search}%'`);
      }
    }
    return super.find(params, pagination, () => customFindWithRelations, 't');
  }

  async updatePassword(id: number, { old_password, new_password }: UpdateAccountPasswordDto): Promise<Account> {
    const account = await this.repository.findOneOrFail({ id });
    if (old_password === new_password) {
      throw new BadRequestException(EXC_NEW_PASSWORD_THE_SAME);
    }
    if (!AccountService.comparePasswordSync(old_password, account.password_hash)) {
      throw new BadRequestException(EXC_ACCOUNT_OLD_PASSWORD_MISMATCH);
    }
    if (!isPasswordSecureEnough(new_password)) {
      throw new BadRequestException(EXC_NEW_PASSWORD_NOT_SECURE);
    }
    account.password_hash = await this.createPasswordHash(new_password);
    return this.repository.save(account);
  }

  async resetPassword(id: number): Promise<Account> {
    const account = await this.repository.findOneOrFail({ id });
    await this.repository.save(
      Object.assign(
        account,
        {
          password_hash: await this.createPasswordHash(DEFAULT_PASSWORD),
          is_temporary_password: true,
        },
      ),
    );
    const mailOptions = {
      from: FROM_EMAIL,
      to: account.email,
      subject: RESET_PASSWORD_EMAIL_SUBJECT,
      html: RESET_PASSWORD_EMAIL_HTML,
    };
    try{
      await sendMail(mailOptions);
      return await this.findWithRelations('t').getOne();
    }
    catch (e){
      return e;
    }
  }

  async create(data: CreateAccountDto, manager?: EntityManager | Repository<Account>): Promise<Account> {
    try {
      manager = manager || this.repository;
      if (data.email) {
        data.email = data.email.toLowerCase();
      }
      await this.checkForTheDuplicates(data.email, data.phone_number);
      const account: Account = Object.assign(new Account(), data);
      if (!data.account_type_id) {
        account.account_type_id = 2; // super-admin
      }
      account.password_hash = await this.createPasswordHash(DEFAULT_PASSWORD);
      account.token_secret = this.generateTokenSecret();
      return await manager.save(account);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        if (err.message.includes('phone_number')) {
          throw new Error(DUPLICATE_ENTRY_PHONE_NUM);
        } else if (err.message.includes('email')) {
          throw new Error(DUPLICATE_ENTRY_EMAIL);
        }
      } else {
        throw new Error(err);
      }
    }
  }

  async updateById(id: number, body: UpdateAccountDto): Promise<Account> {
    let account: Account = await this.getExistingAccountsQuery({ id }).getOne();
    if (!account) {
      throw new BadRequestException(EXC_ACCOUNT_NOT_EXISTS);
    }
    if (body.email) {
      body.email = body.email.toLowerCase();
    }
    await this.checkForTheDuplicates(body.email, body.phone_number, account.id);
    account = Object.assign(account, body);
    if (body.password && account.is_temporary_password) {
      account.password_hash = await this.createPasswordHash(body.password);
      account.is_temporary_password = false;
    }
    return await this.repository.save(account);
  }

  async acceptTos(id: number, req?: any): Promise<Account> {
    const account: Account = await this.getExistingAccountsQuery({ id }).getOne();
    if (!account) {
      throw new BadRequestException(EXC_ACCOUNT_NOT_EXISTS);
    }
    account.tos_accepted_at = new Date().toJSON();
    if (req) {
      account.tos_acceptance_ip = extractIpAddress(req);
    }
    return await this.repository.save(account);
  }

  async setBlockStatusById(id: number, body: SetAccountBlockStatusDto): Promise<Account> {
    const q = this.getExistingAccountsQuery({ id });
    const account = await q.getOne();
    if (!account) {
      throw new BadRequestException('Account\'s block status cannot be changed');
    }
    const updateData = body.block
      ?
      { is_blocked: true, blocked_at: (new Date()).toISOString() }
      :
      { is_blocked: false, blocked_at: null };
    return await this.repository.save(Object.assign(account, updateData));
  }

  async findById(id: number): Promise<Account> {
    const q = this.getExistingAccountsQuery({ id });
    return await q.getOne();
  }

  private async createPasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private generateTokenSecret(): string {
    return crypto.randomBytes(RANDOM_BYTES_SIZE).toString('hex');
  }

  findWithRelations(alias: string, qb?: SelectQueryBuilder<any>): SelectQueryBuilder<Account> {
    const q = qb ? qb : this.repository.createQueryBuilder(alias);
    return q
      .leftJoinAndMapOne(`${alias}.account_type`, AccountType, 'account_type', `account_type.id = ${alias}.account_type_id`)
      .where(`${alias}.is_deleted != true`);
  }

  private getExistingAccountsQuery(params): SelectQueryBuilder<Account> {
    return this.repository
      .createQueryBuilder('t')
      .where(params || {})
      .andWhere('t.is_blocked != true')
      .andWhere('t.is_deleted != true');
  }

  private async checkForTheDuplicates(email: string, phoneNum: string, id?: number): Promise<void> {
    const q = this.repository.createQueryBuilder('t')
      .where('t.email = :email AND t.is_deleted != true', { email });

    if (id) {
      q.andWhere('t.id != :id', { id });
    }
    const duplicates = await q.getMany();
    if (duplicates && duplicates.length) {
      throw new CustomError(
        'ER_DUP_ENTRY',
        'email',
      );
    }
  }

  async changeTokenSecretAndFirebase(account: Account, firebase_token: string): Promise<string> {
    account.token_secret = this.generateTokenSecret();
    if (firebase_token) {
      account.firebase_token = firebase_token;
    }
    const account_id = account.id;
    await this.repository.save(account);
    // TODO report a bug for TypeORM
    account.id = account_id;
    return account.token_secret;
  }

  static comparePasswordSync(password: string, password_hash) {
    return bcrypt.compareSync(password, password_hash);
  }
}
