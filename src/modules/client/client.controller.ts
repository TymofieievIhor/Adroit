import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiUseTags, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { Contact } from '../contact/contact.entity';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { BankAccount } from '../bank-account/bank-account.entity';
import { BankAccountService } from '../bank-account/bank-account.service';
import { File } from '../file/entities/file.entity';
import { FileService } from '../file/file.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { ACCOUNT_ID_HEADER } from '../../common/helpers/constant';
import { FindClientParamsDto } from './dto/find-client-params.dto';
import { SetArchivedStatusDto } from './dto/set-archived-status.dto';
import { ServiceContract } from '../service-contract/entities/service-contract.entity';
import { Passenger } from '../passenger/passenger.entity';
import { PassengerService } from '../passenger/passenger.service';

@ApiUseTags('clients')
@Controller('private/clients')
export class ClientController extends ControllerBase<Client> {
  constructor(protected service: ClientService,
              private bankAccountService: BankAccountService,
              private fileService: FileService,
              private passengerService: PassengerService) {
    super(service, {create: CreateClientDto});
  }

  @Post()
  @ApiOperation({title: 'Create a new client'})
  async create(@Body() body: CreateClientDto, @Req() req?: any): Promise<Client> {
    body.account_id = req.headers[ACCOUNT_ID_HEADER];
    return await super.create(body);
  }

  @Get()
  @ApiOperation({title: 'Get all clients'})
  @ApiImplicitQuery({
    name: 'name',
    description: 'filter by name',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'phone_number',
    description: 'filter by phone_number',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'owner_account_id',
    description: 'filter by owner_account_id',
    required: false,
    type: Number,
  })
  async find(@Query() params: FindClientParamsDto, @Query() pagination: BasicPaginationDto): Promise<IResponseWithPagination<Client>>{
    return await super.find(params, pagination);
  }

  @Get('/:id/contacts')
  @ApiOperation({title: 'Get the contacts list'})
  async findContacts(@Param('id') id: number, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Contact>> {
    return await this.service.findContacts(id, pagination);
  }

  @Get('/:id/bank_accounts')
  @ApiOperation({title: 'Get bank accounts history'})
  async findAll(@Param('id') id: number, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<BankAccount>> {
    return await this.bankAccountService.findWithDeleted({client_id: id}, pagination);
  }

  @Get('/:id/files')
  @ApiOperation({title: 'Get files'})
  async findFiles(@Param('id') id: number, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<File>> {
    return await this.fileService.findFilesByOwner(id, 'client', pagination);
  }

  @Get('/:id/service-contracts')
  @ApiOperation({title: 'Get service contracts'})
  async findServiceContracts(@Param('id') id: number, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<ServiceContract>> {
    return await this.service.getServiceContractsById(id, pagination);
  }

  @Get('/:id/passengers')
  @ApiOperation({title: 'Get all client passengers'})
  async findClientPassengers(@Param('id') id: number, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Passenger>> {
    return await this.passengerService.find({client_id: id}, pagination);
  }

  @Patch('/:id')
  @ApiOperation({title: 'Update a client by id'})
  async updateById(@Param('id') id: number, @Body() body: UpdateClientDto, @Req() req?: any): Promise<Client> {
    body.account_id = req.headers[ACCOUNT_ID_HEADER];
    return await super.updateById(id, body);
  }

  @Post('/set-archived-status/:id')
  @ApiOperation({title: 'Archive/unarchive a client'})
  async setArchiveDStatus(@Param('id') id: number, @Body() body: SetArchivedStatusDto): Promise<void> {
    await this.service.setArchivedStatusById(id, body);
  }

}
