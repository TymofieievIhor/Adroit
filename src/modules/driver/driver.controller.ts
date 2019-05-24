import { Controller, Get, Post, Body, Param, Patch, Query, Req } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { Driver } from './driver.entity';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiOperation, ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { FindDriverParamsDto } from './dto/find-driver-params.dto';
import { BankAccount } from '../bank-account/bank-account.entity';
import { BankAccountService } from '../bank-account/bank-account.service';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { FileService } from '../file/file.service';
import { File } from '../file/entities/file.entity';
import { ACCOUNT_ID_HEADER } from '../../common/helpers/constant';
import { MyTripsCompleteHistoryDto } from '../trip/dto/my-trips-complete-history.dto';
import { TripDailyChecklist } from './trip-daily-checklist.entity';
import { REQUEST_PROPERTY_TOKEN } from '../../common/helpers/auth/constants';
import { extractIpAddress } from '../../common/helpers/function';

@ApiUseTags('drivers')
@Controller('/private/drivers')
export class DriverController extends ControllerBase<Driver> {
  constructor(protected service: DriverService, private bankAccountService: BankAccountService, private fileService: FileService) {
    super(service, {create: CreateDriverDto, update: UpdateDriverDto});
  }

  @Post()
  @ApiOperation({title: 'Create a new driver'})
  async create(@Body() body: CreateDriverDto, @Req() req?: any): Promise<Driver> {
    body.account_id = req.headers[ACCOUNT_ID_HEADER];
    return await super.create(body);
  }

  @Get()
  @ApiOperation({title: 'Get all drivers'})
  @ApiImplicitQuery({
    name: 'first_name',
    description: 'filter by fist_name',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'last_name',
    description: 'filter by last_name',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'email',
    description: 'filter by email',
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
    name: 'partner_id',
    description: 'filter by partner_id',
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: 'ssn',
    description: 'filter by ssn',
    required: false,
    type: String,
  })
  async find(@Query() params: FindDriverParamsDto, @Query() pagination: BasicPaginationDto): Promise<IResponseWithPagination<Driver>> {
    return await super.find(params, pagination);
  }

  @Get('/me')
  @ApiOperation({title: 'Get driver profile for authorized user'})
  async findMe(@Req() req: any): Promise<Driver> {
    return await this.service.findByAccountId(req.headers[ACCOUNT_ID_HEADER]);
  }

  @Get('/:id')
  @ApiOperation({title: 'Get a driver by id'})
  async findById(@Param('id') id: number): Promise<Driver> {
    return await super.findById(id);
  }

  @Get('/:id/bank_accounts')
  @ApiOperation({title: 'Get bank accounts history'})
  async findAll(@Param('id') id: number, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<BankAccount>> {
    return await this.bankAccountService.findWithDeleted({driver_id: id}, pagination);
  }

  @Patch('/:id')
  @ApiOperation({title: 'Update a driver by id'})
  async updateById(@Param('id') id: number, @Body() body: UpdateDriverDto, @Req() req?: any): Promise<Driver> {
    body.account_id = req.headers[ACCOUNT_ID_HEADER];
    return await super.updateById(id, body);
  }

  @Get('/:id/files')
  @ApiOperation({title: 'Get files'})
  async findFiles(@Param('id') id: number, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<File>> {
    return await this.fileService.findFilesByOwner(id, 'driver', pagination);
  }

  @Post('/trip_daily_checklist')
  @ApiOperation({title: 'Create a new trip daily checklist'})
  async createTripDailyChecklist(@Req() req?: any): Promise<TripDailyChecklist> {
    return await this.service.createTripDailyChecklist(req[REQUEST_PROPERTY_TOKEN].driver, req[REQUEST_PROPERTY_TOKEN].client, extractIpAddress(req));
  }

}
