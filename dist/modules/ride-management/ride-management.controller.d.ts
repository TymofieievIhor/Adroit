import { ControllerBase } from '../../common/helpers/controller.base';
import { RideRoute } from './entities/ride-route.entity';
import { CreateRideRouteDto } from './dto/create-ride-route.dto';
import { RideManagementService } from './ride-management.service';
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
export declare class RideManagementController extends ControllerBase<RideRoute> {
    protected service: RideManagementService;
    constructor(service: RideManagementService);
    create(body: CreateRideRouteDto): Promise<RideRoute>;
    createBlueprintAssignment(route_id: number, blueprint_id: number, body: CreateBlueprintAssignmentDto): Promise<any>;
    find(params: FindRideRouteParamsDto, pagination: BasicPaginationDto): Promise<any>;
    getBlueprintInfo(blueprintId: number): Promise<GetRideInfoDto>;
    findRouteById(routeId: number): Promise<CreateRideRouteDto>;
    updateById(id: number, body: UpdateRideRouteDto): Promise<RideRoute>;
    findChangeRequests(params: RideChangeRequestFindParamsDto): Promise<IResponseWithPagination<RideChangeRequestFindResponseDto>>;
    createChangeRequest(body: CreateRideChangeRequestDto): Promise<RideChangeRequest>;
    updateChangeRequest(id: number, body: UpdateRideChangeRequestDto): Promise<RideChangeRequest>;
}
