import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { ControllerBase } from '../../common/helpers/controller.base';
import { Trip } from './entities/trip.entity';
import { TripService } from './trip.service';
import { FindTripParamsDto } from './dto/find-trip-params.dto';
import { api_examples } from '../../common/constrant';
import { MyTripsCompleteHistoryDto } from './dto/my-trips-complete-history.dto';
import { REQUEST_PROPERTY_TOKEN } from '../../common/helpers/auth/constants';

@ApiUseTags('trip')
@Controller('private/trip')
export class TripController extends ControllerBase<Trip> {
  constructor(protected service: TripService) {
    super(service, {
      create: class {
      },
    });
  }

  @Get()
  @ApiOperation({title: 'Get all trips'})
  @ApiImplicitQuery({
    name: 'type',
    description: 'AM or PM',
    required: true,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'date_of_service',
    description: 'e.g. ' + api_examples.date,
    required: true,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'search',
    description: 'search by Trip #, Route #, Blueprint, Place name, Client name, Time, Status, Driver name, Passenger name',
    required: false,
    type: String,
  })
  async find(@Query() params: FindTripParamsDto, @Query() pagination: BasicPaginationDto): Promise<IResponseWithPagination<Trip>> {
    return await this.service.find(params, pagination);
  }

  @Get('my-trips')
  @ApiOperation({title: 'Get history of trips. Work only driver apps'})
  @ApiImplicitQuery({
    name: 'days_limit',
    type: Number,
    required: false,
  })
  async getCompletedHistory(@Req() req, @Query('days_limit') countDay?: number, @Query() pagination?: BasicPaginationDto)
      : Promise<MyTripsCompleteHistoryDto | void> {
  return await this.service.getCompletedTripsHistory(req[REQUEST_PROPERTY_TOKEN].driver, req[REQUEST_PROPERTY_TOKEN].client, countDay, pagination );
  }

  @Get('my-trips/next-upcoming-today')
  @ApiOperation({title: 'Get next upcoming trip. Work only driver apps'})
  async getNextTrip(@Req() req): Promise<any> {
    return await this.service.getNextUpcomingTrip(req[REQUEST_PROPERTY_TOKEN].driver, req[REQUEST_PROPERTY_TOKEN].client);
  }

}
