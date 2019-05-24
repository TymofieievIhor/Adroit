import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import {PartnerService} from './partner.service';
import {ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {Partner} from './partner.entity';
import {ControllerBase} from '../../common/helpers/controller.base';
import {CreatePartnerDto} from './dto/create-partner.dto';
import {UpdatePartnerDto} from './dto/update-partner.dto';
import { BankAccount } from '../bank-account/bank-account.entity';
import { BankAccountService } from '../bank-account/bank-account.service';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { File } from '../file/entities/file.entity';
import { FileService } from '../file/file.service';
import { ACCOUNT_ID_HEADER } from '../../common/helpers/constant';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';
import { FindPartnerDto } from './dto/find-partner.dto';

@ApiUseTags('partners')
@Controller('private/partners')
export class PartnerController extends ControllerBase<Partner> {
    constructor(protected service: PartnerService, private bankAccountService: BankAccountService, private fileService: FileService) {
        super(service, {create: CreatePartnerDto, update: UpdatePartnerDto});
    }

    @Get('/:id/bank_accounts')
    @ApiOperation({title: 'Get bank accounts history'})
    async findAll(@Param('id') id: number, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<BankAccount>> {
        return await this.bankAccountService.findWithDeleted({partner_id: id}, pagination);
    }

    @Get()
    @ApiOperation({ title: 'Find all partners' })
    async find(@Query() params?: FindPartnerDto, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Partner>> {
        return this.service.find(params, pagination);
    }

    @Post()
    @ApiOperation({title: 'Create a new partner'})
    async create(@Body() body: CreatePartnerDto, @Req() req?: any) {
        body.account_id = req.headers[ACCOUNT_ID_HEADER];
        return await super.create(body);
    }

    @Patch('/:id')
    @ApiOperation({title: 'Update a partner by id'})
    async updateById(@Param('id') id: number, @Body() body: UpdatePartnerDto, @Req() req?: any): Promise<Partner> {
        body.account_id = req.headers[ACCOUNT_ID_HEADER];
        return await super.updateById(id, body);
    }

    @Get('/:id/files')
    @ApiOperation({title: 'Get files'})
    async findFiles(@Param('id') id: number, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<File>> {
    return await this.fileService.findFilesByOwner(id, 'partner', pagination);
    }

    @Post('/set-archived-status/:id')
    @ApiOperation({title: 'Archive/unarchive a partner'})
    async setArchiveDStatus(@Param('id') id: number, @Body() body: SetArchivedStatusDto): Promise<void> {
    await this.service.setArchivedStatusById(id, body);
    }
}
