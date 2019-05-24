import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { RideRoute } from './entities/ride-route.entity';
import { CreateRideRouteDto } from './dto/create-ride-route.dto';
import { RideManagementService } from './ride-management.service';
import { ApiUseTags, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { CreateBlueprintAssignmentDto } from './dto/create-blueprint-assignment.dto';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { RideChangeRequestFindParamsDto } from './dto/ride-change-request-find-params.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { RideChangeRequest } from './entities/ride-change-request.entity';
import { RideChangeRequestFindResponseDto } from './dto/ride-change-request-find-response.dto';
import { CreateRideChangeRequestDto } from './dto/create-ride-change-request.dto';
import { UpdateRideChangeRequestDto } from './dto/update-ride-change-request.dto';
import { FindRideRouteParamsDto } from './dto/find-ride-route-params.dto';
import { UpdateRideRouteDto } from './dto/update-ride-route.dto';
import { GetRideInfoDto } from './dto/get-ride-info.dto';

@ApiUseTags('ride-management')
@Controller('private/ride-management')
export class RideManagementController extends ControllerBase<RideRoute> {
  constructor(protected service: RideManagementService) {
    super(service, {create: CreateRideRouteDto});
  }

  @Post()
  @ApiOperation({title: 'Create a new ride route'})
  async create(@Body() body: CreateRideRouteDto): Promise<RideRoute> {
    return await this.service.create(body);
  }

  @Post('/routes/:route_id/blueprints/:blueprint_id/assignment')
  @ApiOperation({title: 'Create a blueprint assignment'})
  @ApiImplicitParam({name: 'route_id', type: Number})
  @ApiImplicitParam({name: 'blueprint_id', type: Number})
  async createBlueprintAssignment(@Param('route_id') route_id: number, @Param('blueprint_id') blueprint_id: number,
                                  @Body() body: CreateBlueprintAssignmentDto): Promise<any> {
    return await this.service.createBlueprintAssignment(route_id, blueprint_id, body);
  }

  @Get()
  @ApiOperation({title: 'Get a ride-management list'})
  async find(@Query() params: FindRideRouteParamsDto, @Query() pagination: BasicPaginationDto): Promise<any> {
    return await this.service.getRideManagementList(params, pagination);
  }

  @Get('/blueprint/:blueprintId')
  @ApiOperation({title: 'Get a blueprint route list'})
  async getBlueprintInfo(@Param('blueprintId') blueprintId: number): Promise<GetRideInfoDto> {
    return await this.service.getRideInfo(blueprintId);
  }

  @Get('/route/:routeId')
  @ApiOperation({title: 'Find a route by id'})
  async findRouteById(@Param('routeId') routeId: number): Promise<CreateRideRouteDto> {
    return await this.service.getRouteById(routeId);
  }

  @Patch('/:id')
  @ApiOperation({title: 'Update a ride route by id'})
  async updateById(@Param('id') id: number, @Body() body: UpdateRideRouteDto): Promise<RideRoute> {
    return await this.service.updateRideRouteById(id, body);
  }

  @Get('/change-requests')
  @ApiOperation({title: 'Get ride-management change requests'})
  async findChangeRequests(@Query() params: RideChangeRequestFindParamsDto): Promise<IResponseWithPagination<RideChangeRequestFindResponseDto>> {
    return await this.service.findChangeRequest(params);
  }

  @Post('/change-requests')
  @ApiOperation({title: 'Create a change request'})
  async createChangeRequest(@Body() body: CreateRideChangeRequestDto): Promise<RideChangeRequest> {
    return await this.service.createChangeRequest(body);
  }

  @Patch('/change-requests/:id')
  @ApiOperation({title: 'Update a change request'})
  async updateChangeRequest(@Param('id') id: number, @Body() body: UpdateRideChangeRequestDto): Promise<RideChangeRequest> {
    return await this.service.updateChangeRequest(id, body);
  }
}
