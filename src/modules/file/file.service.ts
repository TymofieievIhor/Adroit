import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { EntityManager, Repository, Transaction, TransactionManager } from 'typeorm';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { PartnerFile } from './entities/partner-file.entity';
import { DriverFile } from './entities/driver-file.entity';
import { Stream } from 'stream';
import * as AWS from 'aws-sdk';
import * as zlip from 'zlib';
import { CreateFileLinkDto } from './dto/create-file-link.dto';
import { TypedEnv } from '../../common/env/constant';
import { FOLDER_NAME } from '../../common/helpers/s3/file_uploading.constant';
import { ClientFile } from './entities/client-file.entity';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { MISSING_RECORD } from '../../common/error-handling/exception-messages';

@Injectable()
export class FileService extends ServiceBase<File> {

  private s3;

  private s3Params;

  private readonly folder;

  constructor(
    @InjectRepository(File) protected readonly repository: Repository<File>,
    @InjectRepository(PartnerFile) protected readonly partnerFileRepo: Repository<PartnerFile>,
    @InjectRepository(DriverFile) protected readonly driverFileRepo: Repository<DriverFile>,
    @InjectRepository(ClientFile) protected readonly clientFileRepo: Repository<ClientFile>,
  ) {
    super(File, repository);
    AWS.config.accessKeyId = TypedEnv.AWS_ACCESS_KEY_ID;
    AWS.config.secretAccessKey = TypedEnv.AWS_SECRET_ACCESS_KEY;
    this.s3 = new AWS.S3();
    this.s3Params = {
      Bucket: TypedEnv.AWS_BUCKET,
    };
    this.folder = FOLDER_NAME;
  }

  @Transaction()
  async create(data: CreateFileDto, @TransactionManager() manager?: EntityManager): Promise<File> {
    return await this.createInTxChain(data, manager);
  }

  async createInTxChain(data: CreateFileDto, manager?: EntityManager): Promise<File> {
    let file = Object.assign(new File(), data);
    file = await manager.save(File, file);
    let fileLink;

    if (data.partner_id) {
      fileLink = Object.assign(new PartnerFile(), {file_id: file.id, partner_id: data.partner_id});
      await manager.save(PartnerFile, fileLink);
    } else if (data.driver_id) {
      fileLink = Object.assign(new DriverFile(), {file_id: file.id, driver_id: data.driver_id});
      await manager.save(DriverFile, fileLink);
    } else if (data.client_id) {
      fileLink = Object.assign(new ClientFile(), {file_id: file.id, client_id: data.client_id});
      await manager.save(ClientFile, fileLink);
    }
    return file;
  }

  async findFilesByOwner(id: number, owner: string, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<File>> {
    let fileLinks;
    if (owner === 'partner') {
      fileLinks = await this.partnerFileRepo.find({partner_id: id});
    } else if (owner === 'driver') {
      fileLinks = await this.driverFileRepo.find({driver_id: id});
    } else if (owner === 'client') {
      fileLinks = await this.clientFileRepo.find({client_id: id});
    }
    if (fileLinks && fileLinks.length) {
      const q = this.repository.createQueryBuilder('t')
        .where(`t.id in (${fileLinks.map((link) => link.file_id).join(', ')})`)
        .andWhere('t.is_deleted != true');
      await super.applyPagination(q, 't', pagination);
      const [items, count] = await q.getManyAndCount();
      return {items, count};
    }
    return {items: [], count: 0};
  }

  async createLink(data: CreateFileLinkDto, manager?: EntityManager): Promise<DriverFile | PartnerFile | ClientFile> {
    let fileLink;
    const file = await super.findById(data.file_id);
    if (!file) {
      throw new BadRequestException(MISSING_RECORD);
    }
    if (data.partner_id) {
      fileLink = Object.assign(new PartnerFile(), {file_id: data.file_id, partner_id: data.partner_id});
      return await manager.save(PartnerFile, fileLink);
    } else if (data.driver_id) {
      fileLink = Object.assign(new DriverFile(), {file_id: data.file_id, driver_id: data.driver_id});
      return await manager.save(DriverFile, fileLink);
    } else if (data.client_id) {
      fileLink = Object.assign(new ClientFile(), {file_id: data.file_id, client_id: data.client_id});
      return await manager.save(ClientFile, fileLink);
    }
  }

  async upload(req: Stream): Promise<File> {
    const {url, key} = await this.uploadToAws(req);
    const file = Object.assign(new File(), {name: key, cdn_url: url, key}); // TODO: add filename
    return await this.repository.save(file);
  }

  private async uploadToAws(data: Stream): Promise<{url: string, key: string}> {
    const managedUpload = await this.s3.upload(
      {
        Body: data,
        Bucket: this.s3Params.Bucket,
        Key: `${this.folder}/file${Math.random().toString(36).slice(2)}`, // TODO: add filename
      },
      );

    managedUpload
      .on('httpUploadProgress', (progress) => console.log(progress));

    const sendData = await managedUpload.promise();
    return {
      url: sendData.Location,
      key: sendData.Key,
    };
  }

  private async deleteFromAws(key: string): Promise<void> {
    const s3Params = Object.assign({}, this.s3Params, {Key: key});
    await this.s3.deleteObject(s3Params).promise();
  }

  private async getDownloadFileStream(key: string): Promise<Stream> {
      const s3Params = Object.assign({}, this.s3Params, {Key: key});
      await this.s3.headObject(s3Params).promise();
      return this.s3.getObject(s3Params).createReadStream();
  }

  async deleteById(id: number, accountId?: number): Promise<void> {
    const file = await this.repository.findOne({id});
    if (!file || file.is_deleted) {
      throw new BadRequestException('The record is missing');
    }
    file.is_deleted = true;
    file.deleted_at = (new Date()).toISOString();
    file.deleted_by_account_id = accountId;
    await this.repository.save(file);
    await this.deleteFileLink('driver', id);
    await this.deleteFileLink('partner', id);
    await this.deleteFileLink('client', id);
  }

  async deleteFileLink(ownerName: string, fileId: number) {
    let repo;
    if (ownerName === 'driver') {
      repo = this.driverFileRepo;
    } else if (ownerName === 'client') {
      repo = this.clientFileRepo;
    } else if (ownerName === 'partner') {
      repo = this.partnerFileRepo;
    }
    const fileLink = await repo.findOne({file_id: fileId});
    if (fileLink) {
      fileLink.is_deleted = true;
      fileLink.deleted_at = (new Date()).toISOString();
      await repo.save(fileLink);
    }
  }

  async download(id: number, res): Promise<void> {
    try {
      const file = await this.repository.findOne({id});
      if (!file || file.is_deleted) {
        throw new BadRequestException(MISSING_RECORD);
      }
      const stream = await this.getDownloadFileStream(file.key);
      stream
        .pipe(res);
    } catch (err) {
      if (err.code === 'NotFound') {
        throw new BadRequestException('The file does not exist');
      }
      throw new BadRequestException('The file cannot be downloaded');
    }
  }
}
