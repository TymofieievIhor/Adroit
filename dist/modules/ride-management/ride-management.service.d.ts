import { ServiceBase } from '../../common/helpers/service.base';
import { RideRoute } from './entities/ride-route.entity';
import { Repository, EntityManager } from 'typeorm';
import { CreateRideRouteDto } from './dto/create-ride-route.dto';
import { RideBlueprint } from './entities/ride-blueprint.entity';
import { LocationService } from '../location/location.service';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { CreateBlueprintAssignmentDto } from './dto/create-blueprint-assignment.dto';
import { RideBlueprintAssignment } from './entities/ride-blueprint-assignment.entity';
import { RideDriverPayoutAdjustment } from './entities/ride-driver-payout-adjustment.entity';
import { RideChangeRequest } from './entities/ride-change-request.entity';
import { CreateRideChangeRequestDto } from './dto/create-ride-change-request.dto';
import { UpdateRideChangeRequestDto } from './dto/update-ride-change-request.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { RideChangeRequestFindResponseDto } from './dto/ride-change-request-find-response.dto';
import { RideChangeRequestFindParamsDto } from './dto/ride-change-request-find-params.dto';
import { FindRideRouteParamsDto } from './dto/find-ride-route-params.dto';
import { UpdateRideRouteDto } from './dto/update-ride-route.dto';
import { TripMutatorService } from '../trip/trip-mutator.service';
import { GetRideInfoDto } from './dto/get-ride-info.dto';
export declare class RideManagementService extends ServiceBase<RideRoute> {
    protected readonly repository: Repository<RideRoute>;
    protected readonly blueprintAssignmentRepo: Repository<RideBlueprintAssignment>;
    protected readonly rideBlueprintRepo: Repository<RideBlueprint>;
    protected readonly rideChangeRequestRepo: Repository<RideChangeRequest>;
    private readonly driver;
    private locationService;
    private tripModifier;
    constructor(repository: Repository<RideRoute>, blueprintAssignmentRepo: Repository<RideBlueprintAssignment>, rideBlueprintRepo: Repository<RideBlueprint>, rideChangeRequestRepo: Repository<RideChangeRequest>, driver: Repository<RideDriverPayoutAdjustment>, locationService: LocationService, tripModifier: TripMutatorService);
    create(data: CreateRideRouteDto, manager?: EntityManager): Promise<RideRoute>;
    updateRideRouteById(id: number, data: UpdateRideRouteDto, manager?: EntityManager): Promise<RideRoute>;
    getRideManagementList(body?: FindRideRouteParamsDto, pagination?: BasicPaginationDto, manager?: EntityManager): Promise<any>;
    getRouteById(id: number): Promise<CreateRideRouteDto>;
    createBlueprintAssignment(route_id: number, blueprint_id: number, body: CreateBlueprintAssignmentDto, manager?: EntityManager): Promise<RideBlueprintAssignment>;
    createChangeRequest(data: CreateRideChangeRequestDto, accountId?: number, manager?: EntityManager): Promise<RideChangeRequest>;
    updateChangeRequest(id: number, data: UpdateRideChangeRequestDto): Promise<RideChangeRequest>;
    findChangeRequest(params: RideChangeRequestFindParamsDto): Promise<IResponseWithPagination<RideChangeRequestFindResponseDto>>;
    getRideInfo(blueprint_id: number): Promise<GetRideInfoDto>;
    private validateItemsCount;
    private checkIfBlueprintIsAssignedToRideRoute;
    private assignBlueprintTypes;
    private assignRouteBlueprintTypes;
    private processRideRouteInTxChain;
    private processRideClientsInTxChain;
    private processRidePlacesInTxChain;
    private processRideBlueprintsInTxChain;
    private processRidePassengersInTxChain;
    private processClientInvoiceAdjustmentsTxChain;
    private processWaypointPassengerInTxChain;
    private assignRideChangeBlueprintTypes;
    private assignRecurringDays;
    private findWithRelations;
}
