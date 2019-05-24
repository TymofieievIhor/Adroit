"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const service_base_1 = require("../../common/helpers/service.base");
const typeorm_1 = require("typeorm");
const file_entity_1 = require("./entities/file.entity");
const typeorm_2 = require("@nestjs/typeorm");
const create_file_dto_1 = require("./dto/create-file.dto");
const partner_file_entity_1 = require("./entities/partner-file.entity");
const driver_file_entity_1 = require("./entities/driver-file.entity");
const AWS = require("aws-sdk");
const constant_1 = require("../../common/env/constant");
const file_uploading_constant_1 = require("../../common/helpers/s3/file_uploading.constant");
const client_file_entity_1 = require("./entities/client-file.entity");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
let FileService = class FileService extends service_base_1.ServiceBase {
    constructor(repository, partnerFileRepo, driverFileRepo, clientFileRepo) {
        super(file_entity_1.File, repository);
        this.repository = repository;
        this.partnerFileRepo = partnerFileRepo;
        this.driverFileRepo = driverFileRepo;
        this.clientFileRepo = clientFileRepo;
        AWS.config.accessKeyId = constant_1.TypedEnv.AWS_ACCESS_KEY_ID;
        AWS.config.secretAccessKey = constant_1.TypedEnv.AWS_SECRET_ACCESS_KEY;
        this.s3 = new AWS.S3();
        this.s3Params = {
            Bucket: constant_1.TypedEnv.AWS_BUCKET,
        };
        this.folder = file_uploading_constant_1.FOLDER_NAME;
    }
    async create(data, manager) {
        return await this.createInTxChain(data, manager);
    }
    async createInTxChain(data, manager) {
        let file = Object.assign(new file_entity_1.File(), data);
        file = await manager.save(file_entity_1.File, file);
        let fileLink;
        if (data.partner_id) {
            fileLink = Object.assign(new partner_file_entity_1.PartnerFile(), { file_id: file.id, partner_id: data.partner_id });
            await manager.save(partner_file_entity_1.PartnerFile, fileLink);
        }
        else if (data.driver_id) {
            fileLink = Object.assign(new driver_file_entity_1.DriverFile(), { file_id: file.id, driver_id: data.driver_id });
            await manager.save(driver_file_entity_1.DriverFile, fileLink);
        }
        else if (data.client_id) {
            fileLink = Object.assign(new client_file_entity_1.ClientFile(), { file_id: file.id, client_id: data.client_id });
            await manager.save(client_file_entity_1.ClientFile, fileLink);
        }
        return file;
    }
    async findFilesByOwner(id, owner, pagination) {
        let fileLinks;
        if (owner === 'partner') {
            fileLinks = await this.partnerFileRepo.find({ partner_id: id });
        }
        else if (owner === 'driver') {
            fileLinks = await this.driverFileRepo.find({ driver_id: id });
        }
        else if (owner === 'client') {
            fileLinks = await this.clientFileRepo.find({ client_id: id });
        }
        if (fileLinks && fileLinks.length) {
            const q = this.repository.createQueryBuilder('t')
                .where(`t.id in (${fileLinks.map((link) => link.file_id).join(', ')})`)
                .andWhere('t.is_deleted != true');
            await super.applyPagination(q, 't', pagination);
            const [items, count] = await q.getManyAndCount();
            return { items, count };
        }
        return { items: [], count: 0 };
    }
    async createLink(data, manager) {
        let fileLink;
        const file = await super.findById(data.file_id);
        if (!file) {
            throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
        }
        if (data.partner_id) {
            fileLink = Object.assign(new partner_file_entity_1.PartnerFile(), { file_id: data.file_id, partner_id: data.partner_id });
            return await manager.save(partner_file_entity_1.PartnerFile, fileLink);
        }
        else if (data.driver_id) {
            fileLink = Object.assign(new driver_file_entity_1.DriverFile(), { file_id: data.file_id, driver_id: data.driver_id });
            return await manager.save(driver_file_entity_1.DriverFile, fileLink);
        }
        else if (data.client_id) {
            fileLink = Object.assign(new client_file_entity_1.ClientFile(), { file_id: data.file_id, client_id: data.client_id });
            return await manager.save(client_file_entity_1.ClientFile, fileLink);
        }
    }
    async upload(req) {
        const { url, key } = await this.uploadToAws(req);
        const file = Object.assign(new file_entity_1.File(), { name: key, cdn_url: url, key });
        return await this.repository.save(file);
    }
    async uploadToAws(data) {
        const managedUpload = await this.s3.upload({
            Body: data,
            Bucket: this.s3Params.Bucket,
            Key: `${this.folder}/file${Math.random().toString(36).slice(2)}`,
        });
        managedUpload
            .on('httpUploadProgress', (progress) => console.log(progress));
        const sendData = await managedUpload.promise();
        return {
            url: sendData.Location,
            key: sendData.Key,
        };
    }
    async deleteFromAws(key) {
        const s3Params = Object.assign({}, this.s3Params, { Key: key });
        await this.s3.deleteObject(s3Params).promise();
    }
    async getDownloadFileStream(key) {
        const s3Params = Object.assign({}, this.s3Params, { Key: key });
        await this.s3.headObject(s3Params).promise();
        return this.s3.getObject(s3Params).createReadStream();
    }
    async deleteById(id, accountId) {
        const file = await this.repository.findOne({ id });
        if (!file || file.is_deleted) {
            throw new common_1.BadRequestException('The record is missing');
        }
        file.is_deleted = true;
        file.deleted_at = (new Date()).toISOString();
        file.deleted_by_account_id = accountId;
        await this.repository.save(file);
        await this.deleteFileLink('driver', id);
        await this.deleteFileLink('partner', id);
        await this.deleteFileLink('client', id);
    }
    async deleteFileLink(ownerName, fileId) {
        let repo;
        if (ownerName === 'driver') {
            repo = this.driverFileRepo;
        }
        else if (ownerName === 'client') {
            repo = this.clientFileRepo;
        }
        else if (ownerName === 'partner') {
            repo = this.partnerFileRepo;
        }
        const fileLink = await repo.findOne({ file_id: fileId });
        if (fileLink) {
            fileLink.is_deleted = true;
            fileLink.deleted_at = (new Date()).toISOString();
            await repo.save(fileLink);
        }
    }
    async download(id, res) {
        try {
            const file = await this.repository.findOne({ id });
            if (!file || file.is_deleted) {
                throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
            }
            const stream = await this.getDownloadFileStream(file.key);
            stream
                .pipe(res);
        }
        catch (err) {
            if (err.code === 'NotFound') {
                throw new common_1.BadRequestException('The file does not exist');
            }
            throw new common_1.BadRequestException('The file cannot be downloaded');
        }
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_file_dto_1.CreateFileDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], FileService.prototype, "create", null);
FileService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(file_entity_1.File)),
    __param(1, typeorm_2.InjectRepository(partner_file_entity_1.PartnerFile)),
    __param(2, typeorm_2.InjectRepository(driver_file_entity_1.DriverFile)),
    __param(3, typeorm_2.InjectRepository(client_file_entity_1.ClientFile)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map