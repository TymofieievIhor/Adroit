import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { Place } from './entities/place.entity';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { ApiUseTags, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { FindPlaceParamsDto } from './dto/find-place-params.dto';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';

@ApiUseTags('place')
@Controller('private/place')
export class PlaceController extends ControllerBase<Place> {
  constructor(protected service: PlaceService) {
    super(service, {create: CreatePlaceDto});
  }

  @Post()
  @ApiOperation({title: 'Create a new place'})
  async create(@Body() body: CreatePlaceDto) {
    return await super.create(body);
  }

  @Get() // TODO: Add a filter by type
  @ApiOperation({title: 'Get all places'})
  @ApiImplicitQuery({
    name: 'name',
    description: 'filter by name',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'time_zone',
    description: 'filter by time_zone (abbreviation)',
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
    name: 'country',
    description: 'filter by country',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'state',
    description: 'filter by state',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'zipcode',
    description: 'filter by zipcode',
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: 'city',
    description: 'filter by city',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'latitude',
    description: 'filter by latitude',
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: 'longitude',
    description: 'filter by longitude',
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: 'street',
    description: 'filter by street',
    required: false,
    type: String,
  })
  async find(@Query() params: FindPlaceParamsDto, @Query() pagination: BasicPaginationDto): Promise<IResponseWithPagination<Place>> {
    return await super.find(params, pagination);
  }

  @Post('/set-archived-status/:id')
  @ApiOperation({title: 'Archive/unarchive a place'})
  async setArchiveDStatus(@Param('id') id: number, @Body() body: SetArchivedStatusDto): Promise<void> {
    await this.service.setArchivedStatusById(id, body);
  }
}
