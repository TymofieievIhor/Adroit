/// <reference types="node" />
import { ServiceBase } from '../../common/helpers/service.base';
import { EntityManager, Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { PartnerFile } from './entities/partner-file.entity';
import { DriverFile } from './entities/driver-file.entity';
import { Stream } from 'stream';
import { CreateFileLinkDto } from './dto/create-file-link.dto';
import { ClientFile } from './entities/client-file.entity';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
export declare class FileService extends ServiceBase<File> {
    protected readonly repository: Repository<File>;
    protected readonly partnerFileRepo: Repository<PartnerFile>;
    protected readonly driverFileRepo: Repository<DriverFile>;
    protected readonly clientFileRepo: Repository<ClientFile>;
    private s3;
    private s3Params;
    private readonly folder;
    constructor(repository: Repository<File>, partnerFileRepo: Repository<PartnerFile>, driverFileRepo: Repository<DriverFile>, clientFileRepo: Repository<ClientFile>);
    create(data: CreateFileDto, manager?: EntityManager): Promise<File>;
    createInTxChain(data: CreateFileDto, manager?: EntityManager): Promise<File>;
    findFilesByOwner(id: number, owner: string, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<File>>;
    createLink(data: CreateFileLinkDto, manager?: EntityManager): Promise<DriverFile | PartnerFile | ClientFile>;
    upload(req: Stream): Promise<File>;
    private uploadToAws;
    private deleteFromAws;
    private getDownloadFileStream;
    deleteById(id: number, accountId?: number): Promise<void>;
    deleteFileLink(ownerName: string, fileId: number): Promise<void>;
    download(id: number, res: any): Promise<void>;
}
