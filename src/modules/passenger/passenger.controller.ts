import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { Passenger } from './passenger.entity';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { ACCOUNT_ID_HEADER } from '../../common/helpers/constant';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';
import { FindPassengerParamsDto } from './dto/find-passenger-params.dto';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';

@ApiUseTags('passenger')
@Controller('private/passenger')
export class PassengerController extends ControllerBase<Passenger> {
  constructor(protected service: PassengerService) {
    super(service, {create: CreatePassengerDto});
  }

  @Post()
  @ApiOperation({title: 'Create a new passenger'})
  async create(@Body() body: CreatePassengerDto): Promise<Passenger> {
    return await super.create(body);
  }

  @Patch('/:id')
  @ApiOperation({title: 'Update a passenger by id'})
  async updateById(@Param('id') id: number, @Body() body: UpdatePassengerDto, @Req() req?: any): Promise<Passenger> {
    body.account_id = req.headers[ACCOUNT_ID_HEADER];
    return await super.updateById(id, body);
  }

  @Post('/set-archived-status/:id')
  @ApiOperation({title: 'Archive/unarchive a passenger'})
  async setArchiveDStatus(@Param('id') id: number, @Body() body: SetArchivedStatusDto): Promise<void> {
    await this.service.setArchivedStatusById(id, body);
  }

  @Get()
  @ApiOperation({title: 'Find all passengers'})
  async find(@Query() params?: FindPassengerParamsDto, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Passenger>> {
    return await this.service.find(params, pagination);
  }

  @Get('/client/:id')
  @ApiOperation({title: 'Find passengers by the client id'})
  async findPassengersByClientId(@Param('id') clientId: number): Promise<Passenger[]> {
    return await this.service.findPassengersByClientId(clientId);
  }

}
