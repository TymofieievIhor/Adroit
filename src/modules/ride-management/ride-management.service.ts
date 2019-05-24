import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { RideRoute } from './entities/ride-route.entity';
import { Repository, Transaction, TransactionManager, EntityManager, SelectQueryBuilder, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRideRouteDto } from './dto/create-ride-route.dto';
import { RideClient } from './entities/ride-client.entity';
import { RidePlace } from './entities/ride-place.entity';
import { RidePlacePassenger } from './entities/ride-place-passenger.entity';
import { RideBlueprint } from './entities/ride-blueprint.entity';
import { RideClientInvoiceAdjustment } from './entities/ride-client-invoice-adjustment.entity';
import { RideBlueprintWaypoint } from './entities/ride-blueprint-waypoint.entity';
import { RideBlueprintWaypointPassenger } from './entities/ride-bluerprint-waypoint-passenger.entity';
import { LocationService } from '../location/location.service';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { Place } from '../place/entities/place.entity';
import { Client } from '../client/client.entity';
import { DaysOfService, RideBlueprintDto } from './dto/ride-blueprint.dto';
import { RideClientDto } from './dto/ride-client.dto';
import { RidePassengerDto } from './dto/ride-passenger.dto';
import { RidePlaceDto } from './dto/ride-place.dto';
import { RideClientAdjustmentDto } from './dto/ride-client-adjustment.dto';
import { RideBlueprintWaypointDto } from './dto/ride-blueprint-waypoint.dto';
import { CreateBlueprintAssignmentDto, RecurringDaysDriverMap } from './dto/create-blueprint-assignment.dto';
import { RideBlueprintAssignment } from './entities/ride-blueprint-assignment.entity';
import { RideDriverPayoutAdjustment } from './entities/ride-driver-payout-adjustment.entity';
import { Passenger } from '../passenger/passenger.entity';
import { RideChangeRequest } from './entities/ride-change-request.entity';
import { CreateRideChangeRequestDto } from './dto/create-ride-change-request.dto';
import { BlueprintTypes, UpdateRideChangeRequestDto } from './dto/update-ride-change-request.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { RideChangeRequestFindResponseDto } from './dto/ride-change-request-find-response.dto';
import { RideChangeRequestFindParamsDto } from './dto/ride-change-request-find-params.dto';
import { RideChangeRequestType } from './entities/ride-change-request-type.entity';
import { FindRideRouteParamsDto } from './dto/find-ride-route-params.dto';
import { MISSING_RECORD } from '../../common/error-handling/exception-messages';
import { UpdateRideRouteDto } from './dto/update-ride-route.dto';
import {
  CHANGE_REQ_TYPE_ACTION_MAP,
  MAX_BLUEPRINT_NUMBER,
  MAX_PAYING_CLIENT_NUMBER,
  MAX_PLACE_NUMBER,
  TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS,
  BlueprintTimeTypes, EXC_UNKNOWN_BLUEPRINT_TYPE,
  WAYPOINT_TYPE,
} from '../../common/helpers/constant';
import { TripMutatorService } from '../trip/trip-mutator.service';
import { Trip } from '../trip/entities/trip.entity';
import { GetRideInfoDto } from './dto/get-ride-info.dto';
import { LocationLink } from '../location/location-link.entity';

const week = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

@Injectable()
export class RideManagementService extends ServiceBase<RideRoute> {
  constructor(
    @InjectRepository(RideRoute) protected readonly repository: Repository<RideRoute>,
    @InjectRepository(RideBlueprintAssignment) protected readonly blueprintAssignmentRepo: Repository<RideBlueprintAssignment>,
    @InjectRepository(RideBlueprint) protected readonly rideBlueprintRepo: Repository<RideBlueprint>,
    @InjectRepository(RideChangeRequest) protected readonly rideChangeRequestRepo: Repository<RideChangeRequest>,
    @InjectRepository(RideDriverPayoutAdjustment) private readonly driver: Repository<RideDriverPayoutAdjustment>,
    private locationService: LocationService,
    private tripModifier: TripMutatorService,
  ) {
    super(RideRoute, repository);
  }

  @Transaction()
  async create(data: CreateRideRouteDto, @TransactionManager() manager?: EntityManager): Promise<RideRoute> {
    const rideRoute = await this.processRideRouteInTxChain(data.blueprints, manager);

    await this.processRideClientsInTxChain(data.clients, rideRoute.id, manager);

    await this.processRidePlacesInTxChain(data.places, rideRoute.id, manager);

    await this.processRideBlueprintsInTxChain(data.blueprints, rideRoute.id, manager);

    return rideRoute;
  }

  // Some relations (e.g. waypoint) of a ride are created instead of being updated.
  @Transaction()
  async updateRideRouteById(id: number, data: UpdateRideRouteDto, @TransactionManager() manager?: EntityManager): Promise<RideRoute> {
    let rideRoute = await manager.findOne(RideRoute, { id, is_active: true, is_deleted: false, is_archived: false });

    if (!rideRoute) {
      throw new BadRequestException('The ride route does not exist');
    }

    if (data.blueprints) {
      rideRoute = await this.processRideRouteInTxChain(data.blueprints, manager, rideRoute);
      data.blueprints = await this.validateItemsCount(data.blueprints, RideBlueprint, rideRoute.id, MAX_BLUEPRINT_NUMBER);
      if (data.blueprints.length) {
        await this.processRideBlueprintsInTxChain(data.blueprints, rideRoute.id, manager);
      }
    }

    if (data.clients) {
      data.clients = await this.validateItemsCount(data.clients, RideClient, rideRoute.id, MAX_PAYING_CLIENT_NUMBER);
      if (data.clients.length) {
        await this.processRideClientsInTxChain(data.clients, rideRoute.id, manager);
      }
    }

    if (data.places) {
      data.places = await this.validateItemsCount(data.places, RidePlace, rideRoute.id, MAX_PLACE_NUMBER);
      if (data.places.length) {
        await this.processRidePlacesInTxChain(data.places, rideRoute.id, manager);
      }
    }

    return rideRoute;
  }

  @Transaction()
  async getRideManagementList(
    body?: FindRideRouteParamsDto,
    pagination?: BasicPaginationDto,
    @TransactionManager() manager?: EntityManager,
  ): Promise<any> {
    const resultSet = [];

    // Retrieve all active Ride Routes.
    const routes = await manager.find(RideRoute, { is_active: true }); // TODO: add proper pagination

    // Iterate Ride Routes.
    for (const route of routes) {

      // Retrieve all active Blueprints of this Ride Route.
      const rideBlueprints = await manager.find(RideBlueprint, { ride_route_id: route.id, is_active: true });

      // Iterate all Blueprints.
      for (const rideBlueprint of rideBlueprints) {

        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        // TODO: Refactor into seperate fucntion "retrirveRideBlueprintClientsNameList"

        // Retrieve all the Clients IDs of this Ride Blueprint.
        const rideBlueprintClientsIds = await manager.createQueryBuilder(RideClientInvoiceAdjustment, 'rideClientInvoiceAdjustment')
          .select('rideClientInvoiceAdjustment.client_id')
          .where(`rideClientInvoiceAdjustment.ride_blueprint_id = :id`, { id: rideBlueprint.id })
          .getMany();

        // Create an array containing the Client IDs of this Ride Blueprint.
        const rideBlueprintClientsIdsList = rideBlueprintClientsIds.map((rideBlueprintClientsId) => rideBlueprintClientsId.client_id);

        // TODO: Handle for when a blueprint doesn't have a record in "RideClientInvoiceAdjustment".
        // TODO: Remove this temorary workaround. A blueprint should never be created without a record in "RideClientInvoiceAdjustment".
        if (!rideBlueprintClientsIds.length) {
          break;
          // throw new BadRequestException(MISSING_RECORD);
        }

        // Retrieve only the names of the Clients.
        const rideBlueprintClientsNames = await manager.createQueryBuilder(Client, 'client')
          .select('client.name')
          .where(`client.id IN (${rideBlueprintClientsIdsList.join(',')})`)
          .getMany();

        // Create an array containing the client names of this Ride Blueprint.
        const rideBlueprintClientsNameList = rideBlueprintClientsNames.map((client) => client.name);
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 

        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        // TODO: Refactor into seperate fucntion "retrirveRideBlueprintPlacesNameList"

        const rideBlueprintType = rideBlueprint.type_text_value.toLowerCase();
        const rideBlueprintPlacesIdList = [];
        const rideBlueprintPlacesNameList = [];

        // Retrieve all the Drop Off Place IDs if this Ride Blueprint type is 'am' or 'am_late_start'.
        if (rideBlueprintType === BlueprintTimeTypes.am || rideBlueprintType === BlueprintTimeTypes.am_late_start) {
          const rideBlueprintDropOffPlacesIds = await manager.createQueryBuilder(RideBlueprintWaypoint, 'rideBlueprintWaypoint')
            .select('rideBlueprintWaypoint.place_id')
            .where(`rideBlueprintWaypoint.ride_blueprint_id = :id`, { id: rideBlueprint.id })
            .andWhere(`rideBlueprintWaypoint.type = :type`, { type: WAYPOINT_TYPE.DROPOFF })
            .getMany();

          // Create an array containing the Drop Off Place IDs of this Ride Blueprint.
          rideBlueprintPlacesIdList.push(rideBlueprintDropOffPlacesIds.map((rideBlueprintDropOffPlacesId) => rideBlueprintDropOffPlacesId.place_id));
        }
        // Retrieve all the Pick Up Place IDs if this Ride Blueprint type is 'pm' or 'pm_early_start'.
        else if (rideBlueprintType === BlueprintTimeTypes.pm || rideBlueprintType === BlueprintTimeTypes.pm_early_return) {
          const rideBlueprintPickUpPlacesIds = await manager.createQueryBuilder(RideBlueprintWaypoint, 'rideBlueprintWaypoint')
            .select('rideBlueprintWaypoint.place_id')
            .where(`rideBlueprintWaypoint.ride_blueprint_id = :id`, { id: rideBlueprint.id })
            .andWhere(`rideBlueprintWaypoint.type = :type`, { type: WAYPOINT_TYPE.PICKUP })
            .getMany();

          // Create an array containing the Pick Up Place IDs of this Ride Blueprint.
          rideBlueprintPlacesIdList.push(rideBlueprintPickUpPlacesIds.map((rideBlueprintPickUpPlacesId) => rideBlueprintPickUpPlacesId.place_id));
        }

        // TODO: Handle for when a blueprint doesn't have a record in "rideBlueprintWaypoint".
        // TODO: Remove this temorary workaround. A blueprint should never be created without a record in "rideBlueprintWaypoint".
        if (!rideBlueprintPlacesIdList.length) {
          break;
          // throw new BadRequestException(MISSING_RECORD);
        }

        // Retrieve only the names of the Places.
        const rideBlueprintPlacesNames = await manager.createQueryBuilder(Place, 'place')
          .select('place.name')
          .where(`place.id IN (${rideBlueprintPlacesIdList.join(',')})`)
          .getMany();

        // Create an array containing the place names of this Ride Blueprint.
        rideBlueprintPlacesNameList.push(rideBlueprintPlacesNames.map((place) => place.name));
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 

        // Assemble payload.
        const result = {
          blueprint_id: rideBlueprint.id,
          client_name: "temp client name", // TODO: remove once UI accomidates for chanegs.
          clients_names: rideBlueprintClientsNameList,
          place_name: "temp place name", // TODO: remove once UI accomidates for chanegs.
          places_names: rideBlueprintPlacesNameList,
          route: route.id,
          blueprint: rideBlueprint.type_text_value, // TODO check
          is_assigned: !!(await manager.find(RideBlueprintAssignment, { ride_blueprint_id: rideBlueprint.id })).length,
        };
        resultSet.push(result);
      }
    }

    const uniqueStr = [];
    const uniqueSet = [];
    for (const item of resultSet) {
      if (!uniqueStr.includes(JSON.stringify(item))) {
        uniqueStr.push(JSON.stringify(item));
        uniqueSet.push(item);
      }
    }

    return { items: uniqueSet, count: uniqueSet.length };
  }

  async getRouteById(id: number): Promise<CreateRideRouteDto> {
    const result = {} as CreateRideRouteDto;
    const manager = getManager();

    const route = await manager.findOneOrFail(RideRoute, { id });
    const blueprints = await manager.find(RideBlueprint, { ride_route_id: route.id, is_active: true });
    const places = await manager.find(RidePlace, { ride_route_id: route.id });
    const clients = await manager.find(RideClient, {
      ride_route_id: route.id,
    });

    result.clients = [];
    for (const c of clients) {
      result.clients.push({
        id: c.id,
        client_id: c.client_id,
        invoice_responsibility_percentage: c.invoice_responsibility_percentage,
      });
    }

    result.places = [];
    for (const p of places) {
      const rideBlueprint = await this.rideBlueprintRepo.findOne({ ride_route_id: id });
      const type = rideBlueprint.type_text_value.toLowerCase();
      let waypoint;
      if (type === BlueprintTimeTypes.am || type === BlueprintTimeTypes.am_late_start) {
        waypoint = await manager.findOne(RideBlueprintWaypoint, { type: 'pick_up', ride_blueprint_id: rideBlueprint.id });
      } else {
        waypoint = await manager.findOne(RideBlueprintWaypoint, { type: 'drop_off', ride_blueprint_id: rideBlueprint.id });
      }
      const passengers = await manager.find(RideBlueprintWaypointPassenger, { ride_blueprint_waypoint_id: waypoint.id });
      const place = {
        id: p.id,
        place_id: waypoint.place_id,
        passengers: [],
      };

      for (const pass of passengers) {
        place.passengers.push({
          id: pass.id,
          passenger_id: pass.passenger_id,
          location_id: pass.location_link_id,
        });
      }
      result.places.push(place);
    }

    result.blueprints = [];

    for (const b of blueprints) {
      const blueprintData = {
        id: b.id,
        type: b.type_text_value, // TODO check
        type_of_service: b.type_of_service,
        camera_service_required: b.camera_service_required,
        client_adjustments: [],
        ride_map: [],
        days_of_service: null,
        estimated_mileage: b.estimated_mileage,
        estimated_duration_in_minutes: b.estimated_duration_in_minutes,
      };
      const daysOfService = {};
      for (const prop of Object.keys(b)) {
        if (prop.includes('recurs_on')) {
          if (b[prop]) {
            daysOfService[`${prop.split('_')[2]}`] = true;
          }
        }
      }
      blueprintData.days_of_service = daysOfService;

      const clientAdjs = await manager.find(RideClientInvoiceAdjustment, { ride_blueprint_id: b.id });

      for (const adj of clientAdjs) {
        blueprintData.client_adjustments.push({
          id: adj.id,
          client_id: adj.client_id,
          discount_amount: adj.discount_amount,
          other_service_amount: adj.other_service_amount,
          other_service_item_name: adj.other_service_item_name,
          estimated_ride_fare: adj.estimated_ride_fare,
        });
      }

      const rideBpWaypoints = await manager.find(RideBlueprintWaypoint, {
        ride_blueprint_id: b.id,
      });

      for (const wp of rideBpWaypoints) {
        const wpData = {
          id: wp.id,
          type: wp.type,
          place_id: wp.place_id || null,
          distance_in_miles: wp.distance_from_destination_in_miles,
          distance_in_mins: wp.distance_from_destination_in_mins,
          eta: wp.estimated_arrival_time,
          sta: wp.scheduled_arrival_time,
          am_start: '0', // TODO: remove hard-coded value
          location_id: null,
          waypoint_passengers: [],
        } as RideBlueprintWaypointDto;

        const waypoints = await manager.createQueryBuilder(RideBlueprintWaypoint, 'wp')
          .select('wp.id')
          .where(`wp.ride_blueprint_id = ${b.id}`)
          .andWhere(`wp.place_id = ${wp.place_id}`)
          .getMany();
        const waypointIds = waypoints.map((wpi) => wpi.id);
        const passenger = await manager.createQueryBuilder(RideBlueprintWaypointPassenger, 'p')
          .where(`p.ride_blueprint_waypoint_id IN (${waypointIds.join(',')})`)
          .getOne();

        if (passenger) {
          // wpData.id = passenger.id;
          const location = await this.locationService.findLocationByLocationLinkId(passenger.location_link_id);
          if (location && Object.keys(location).length) {
            wpData.waypoint_passengers.push({ waypoint_passenger_id: passenger.id, passenger_id: passenger.passenger_id });
            wpData.location_id = location.id;
          }
          for (const place of result.places) {
            for (const pass of place.passengers) {
              if (pass.passenger_id === passenger.passenger_id) {
                pass.location_id = location.id;
              }
            }
          }
        }
        blueprintData.ride_map.push(wpData);
      }
      result.blueprints.push(blueprintData);
    }

    return result;
  }

  @Transaction()
  async createBlueprintAssignment(
    route_id: number,
    blueprint_id: number,
    body: CreateBlueprintAssignmentDto,
    @TransactionManager() manager?: EntityManager,
  ): Promise<RideBlueprintAssignment> {
    await this.checkIfBlueprintIsAssignedToRideRoute(blueprint_id);
    let bpAssignment = Object.assign(new RideBlueprintAssignment(), {
      ride_blueprint_id: blueprint_id,
      service_start_date: body.service_start_date,
      service_end_date: body.service_end_date,
    });

    for (const driverDaysAndPayment of body.recurring_days_drivers) {
      for (const [key, value] of Object.entries(driverDaysAndPayment)) {
        if (key === 'day') {
          bpAssignment[`recurs_on_${value}`] = true;
        }
        if (key === 'driver_id') {
          bpAssignment[`${driverDaysAndPayment.day}_driver_id`] = value;
        }
      }
    }

    bpAssignment = await manager.save(bpAssignment);

    const rideDriverPayoutAdjCreatePromises = [];

    for (const driverDaysAndPayment of body.recurring_days_drivers) {
      const params = {
        ride_blueprint_assignment_id: bpAssignment.id,
        driver_id: driverDaysAndPayment.driver_id,
        add_to_ride_fare_payout: driverDaysAndPayment.add_pay,
        deduct_from_ride_fare_payout: driverDaysAndPayment.deduct_pay,
        estimated_ride_fare_payout: driverDaysAndPayment.estimated_driver_payout,
      };
      rideDriverPayoutAdjCreatePromises.push(manager.save(Object.assign(new RideDriverPayoutAdjustment(), params)));
    }

    await Promise.all(rideDriverPayoutAdjCreatePromises);

    return bpAssignment;
  }

  @Transaction()
  async createChangeRequest(data: CreateRideChangeRequestDto, accountId?: number,
    @TransactionManager() manager?: EntityManager): Promise<RideChangeRequest> {
    const changeRequest = Object.assign(new RideChangeRequest(), {
      effective_date: data.effective_date,
      ride_change_request_type_id: data.type_id,
      note: data.note,
    });
    if (data.ride_route_id) {
      changeRequest.ride_route_id = data.ride_route_id;
    }
    if (data.place_id) {
      changeRequest.place_id = data.place_id;
    }
    if (data.passenger_id) {
      changeRequest.passenger_id = data.passenger_id;
    }
    this.assignRideChangeBlueprintTypes(changeRequest, data.blueprint_types);

    if (data.ride_route_id) {
      const trip = await manager.findOne(Trip, { ride_route_id: data.ride_route_id });
      if (trip) {
        const changeReqType = await manager.findOneOrFail(RideChangeRequestType, { id: data.type_id });
        const actionType = CHANGE_REQ_TYPE_ACTION_MAP[changeReqType.text_value];
        if (actionType === TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS && data.passenger_id) {
          await this.tripModifier.dispatch(trip, { type: actionType, payload: { passengerId: data.passenger_id } }, manager);
        } // TODO: add a SWITCH_DRIVER_ACTION
      }
    }
    return await manager.save(changeRequest);
  }

  async updateChangeRequest(id: number, data: UpdateRideChangeRequestDto): Promise<RideChangeRequest> {
    let existingChangeRequest = await this.rideChangeRequestRepo.findOne({ id });
    if (!existingChangeRequest) {
      throw new BadRequestException(MISSING_RECORD);
    }
    existingChangeRequest = Object.assign(existingChangeRequest, data, { ride_change_request_type_id: data.type_id });
    this.assignRideChangeBlueprintTypes(existingChangeRequest, data.blueprint_types);
    return await this.rideChangeRequestRepo.save(existingChangeRequest);
  }

  async findChangeRequest(params: RideChangeRequestFindParamsDto): Promise<IResponseWithPagination<RideChangeRequestFindResponseDto>> {
    const manager = getManager();
    const q = this.rideChangeRequestRepo.createQueryBuilder('t');
    if (params.route_id) {
      q.andWhere(`t.ride_route_id = :id`, { id: params.route_id });
    }

    if (params.place_name) {
      const placeQuery = manager.createQueryBuilder(Place, 'p')
        .where(`p.name LIKE '%${params.place_name}%'`);
      for (const namePart of params.place_name.split(' ')) {
        placeQuery
          .orWhere(`p.name LIKE '%${namePart}%'`);
      }
      const places = await placeQuery.getMany();
      if (places && places.length) {
        q.andWhere(`t.place_id IN (:placeIds)`, { placeIds: places.map((p) => p.id) });
      } else {
        return { items: [], count: 0 };
      }
    }
    if (params.place_name === '') {
      const places = await manager.find(Place, { is_deleted: false });
      q.andWhere(`t.place_id IN (:placeIds)`, { placeIds: places.map((p) => p.id) });
    }

    if (params.passenger_name) {
      const p = manager.createQueryBuilder(Passenger, 'p')
        .where(`p.first_name LIKE '%${params.passenger_name}%'`)
        .orWhere(`p.last_name LIKE '%${params.passenger_name}%'`);
      for (const namePart of params.passenger_name.split(' ')) {
        p
          .orWhere(`p.first_name LIKE '%${namePart}%'`)
          .orWhere(`p.last_name LIKE '%${namePart}%'`);
      }
      const passengers = await p.getMany();
      if (passengers && passengers.length) {
        q.andWhere(`t.passenger_id IN (:passengerIds)`, { passengerIds: passengers.map((pass) => pass.id) });
      } else {
        return { items: [], count: 0 };
      }
    }
    if (params.passenger_name === '') {
      const passengers = await manager.find(Passenger, { is_deleted: false });
      q.andWhere(`t.passenger_id IN (:passengerIds)`, { passengerIds: passengers.map((p) => p.id) });
    }
    const changeRequests = await q.getMany();

    const items = [];
    for (const r of changeRequests) {
      const blueprints = [];
      for (const [k, v] of Object.entries(r)) {
        if (v && k.includes('apply_to')) {
          blueprints.push(k.toString().split('_').slice(2, -1).join(' '));
        }
      }
      const type = await manager.findOne(RideChangeRequestType, { id: r.ride_change_request_type_id });
      items.push(Object.assign(new RideChangeRequestFindResponseDto(), r, {
        type: type ? type.name : null,
        route_id: r.ride_route_id,
        place: r.place_id ? await manager.findOne(Place, r.place_id) : null,
        passenger: r.passenger_id ? await manager.findOne(Passenger, r.passenger_id) : null,
        blueprints,
      }));
    }

    return { items, count: items.length };
  }

  async getRideInfo(blueprint_id: number): Promise<GetRideInfoDto> { // TODO add many waypoint
    const blueprint = await this.checkIfBlueprintIsAssignedToRideRoute(blueprint_id);
    const rideRoute = await this.repository.findOne({ id: blueprint.ride_route_id });
    const waypoint = await this.blueprintAssignmentRepo.find({ ride_blueprint_id: blueprint_id });
    const drivers = await Promise.all(week
      .filter(value => waypoint[0][`recurs_on_${value}`])
      .map(async (value: string) => {
        const driver = await this.driver.findOne({ driver_id: waypoint[0][`${value}_driver_id`] });
        return {
          day: value,
          driver_id: driver.driver_id,
          add_to_ride_fare_payout: driver.add_to_ride_fare_payout,
          deduct_from_ride_fare_payout: driver.deduct_from_ride_fare_payout,
          estimated_ride_fare_payout: driver.estimated_ride_fare_payout,
        };
      }));  // TODO add many driver
    return {
      route_id: blueprint.ride_route_id,
      type_name: blueprint.type_text_value,
      service_start_date: waypoint[0].service_start_date,
      service_end_date: waypoint[0].service_end_date,
      recurring_days_drivers: drivers,
    };
  }

  private async validateItemsCount(
    item: RideBlueprintDto[] | RideClientDto[] | RidePlaceDto[],
    entity: any,
    rideRouteId: number,
    maxCount: number,
  ): Promise<any[]> {
    const manager = getManager();
    const existingCount = await manager.count(entity, { ride_route_id: rideRouteId });
    if (!existingCount || existingCount < maxCount) {
      const availableCount = maxCount - existingCount;
      item = item.slice(0, availableCount);
      return item;
    }
    return [];
  }

  private async checkIfBlueprintIsAssignedToRideRoute(blueprint_id: number): Promise<RideBlueprint> {
    const blueprint = await this.rideBlueprintRepo.findOne({ id: blueprint_id });
    if (!blueprint) {
      throw new BadRequestException('The blueprint doesn\'t belong to the ride');
    }
    return blueprint;
  }

  private assignBlueprintTypes(obj, type) {
    const blueprintType = BlueprintTimeTypes[type.toLowerCase()];
    if (!blueprintType) {
      throw new BadRequestException(EXC_UNKNOWN_BLUEPRINT_TYPE);
    }
    else obj.type_text_value = blueprintType;
  }

  private assignRouteBlueprintTypes(obj: RideRoute, type) {
    const blueprintType = type.toLowerCase();
    switch (blueprintType) {
      case 'am': {
        obj.has_am = true;
        break;
      }
      case 'am_late_start': {
        obj.has_am_late_start = true;
        break;
      }
      case 'pm': {
        obj.has_pm = true;
        break;
      }
      case 'pm_early_return': {
        obj.has_pm_early_return = true;
        break;
      }
      default: {
        throw new BadRequestException(EXC_UNKNOWN_BLUEPRINT_TYPE);
        break;
      }
    }
  }

  private async processRideRouteInTxChain(blueprints: RideBlueprintDto[], manager?: EntityManager, rideRoute?: RideRoute): Promise<RideRoute> {
    if (!rideRoute) {
      rideRoute = new RideRoute();
    }
    for (const blueprint of blueprints) {
      this.assignRouteBlueprintTypes(rideRoute, blueprint.type);
    }
    return await manager.save(rideRoute);
  }

  private async processRideClientsInTxChain(clients: RideClientDto[], rideRouteId: number, manager?: EntityManager): Promise<void> {
    for (const c of clients) {
      const client = Object.assign(
        new RideClient(),
        c,
        { ride_route_id: rideRouteId },
      );
      await manager.save(client);
    }
  }

  private async processRidePlacesInTxChain(places: RidePlaceDto[], rideRouteId: number, manager?: EntityManager): Promise<void> {
    for (const p of places) {
      const ridePlace = Object.assign(new RidePlace(),
        { place_id: p.place_id },
        { ride_route_id: rideRouteId });
      // await this.processRidePassengersInTxChain(p.passengers, p.place_id, rideRouteId, manager);
      await manager.save(ridePlace);
    }
  }

  private async processRideBlueprintsInTxChain(blueprints: RideBlueprintDto[], rideRouteId: number, manager: EntityManager) {
    for (const bp of blueprints) {
      let blueprint = Object.assign(
        new RideBlueprint(),
        { ride_route_id: rideRouteId },
        bp,
      );
      blueprint.is_active = true;
      blueprint.estimated_mileage = blueprint.ride_map.reduce((a, v) => a + v.distance_in_miles, 0);
      blueprint.estimated_duration_in_minutes = blueprint.ride_map.reduce((a, v) => a + v.distance_in_mins, 0);
      await this.assignRecurringDays(blueprint, bp.days_of_service);
      this.assignBlueprintTypes(blueprint, bp.type);
      blueprint = await manager.save(blueprint);

      await this.processClientInvoiceAdjustmentsTxChain(bp.client_adjustments, blueprint.id, manager);

      let order = 1;
      for (const wp of bp.ride_map) {
        const distances = { // TODO: remove hardcoded distances
          distance_from_prior_stop_in_miles: 0,
          distance_from_prior_stop_in_mins: 0,
          distance_from_destination_in_miles: wp.distance_in_miles || 0,
          distance_from_destination_in_mins: wp.distance_in_mins || 0,
        };
        let waypoint = Object.assign(
          new RideBlueprintWaypoint(),
          { ride_blueprint_id: blueprint.id },
          distances,
          {
            id: wp.id,
            order,
            type: wp.type,
            place_id: wp.place_id ? wp.place_id : null,
            estimated_arrival_time: wp.eta,
            scheduled_arrival_time: wp.sta,
          },
        );
        waypoint = await manager.save(waypoint);

        if (wp.type === 'pick_up') {
          wp.waypoint_passengers.map(async (pass) => {
            if (!pass.waypoint_passenger_id) {
              await this.processWaypointPassengerInTxChain(wp, pass.passenger_id, waypoint.id, manager);
            }
          });
        }
        order++;
      }
    }

  }

  private async processRidePassengersInTxChain(passengers: RidePassengerDto[], placeId: number, rideRouteId: number, manager?: EntityManager)
    : Promise<RidePlacePassenger[]> {
    const ridePassengers = [];
    for (const passenger of passengers) {
      const ridePassenger = Object.assign(new RidePlacePassenger(),
        { passenger_id: passenger.passenger_id, place_id: placeId, ride_route_id: rideRouteId });
      ridePassengers.push(manager.save(ridePassenger));
    }
    return await Promise.all(ridePassengers);
  }

  private async processClientInvoiceAdjustmentsTxChain(clientAdj: RideClientAdjustmentDto[], blueprintId: number, manager?: EntityManager)
    : Promise<RideClientInvoiceAdjustment[]> {
    const rideClientInvoiceAdjustments = [];

    for (const c of clientAdj) {
      const clientInvoiceAdj = Object.assign(
        new RideClientInvoiceAdjustment(),
        c,
        { ride_blueprint_id: blueprintId },
      );
      rideClientInvoiceAdjustments.push(manager.save(clientInvoiceAdj));
    }

    return await Promise.all(rideClientInvoiceAdjustments);
  }

  private async processWaypointPassengerInTxChain(
    waypoint: RideBlueprintWaypointDto, passenger_id: number, waypointId: number, manager?: EntityManager)
    : Promise<RideBlueprintWaypointPassenger> {
    const locationLink = await this.locationService.findLocationLinkInTxChain(
      waypoint.location_id,
      { name: 'passenger', id: passenger_id },
      manager,
    );
    const waypointPassenger = Object.assign(
      new RideBlueprintWaypointPassenger(),
      {
        id: waypoint.id,
        ride_blueprint_waypoint_id: waypointId,
        passenger_id,
        location_link_id: locationLink.id,
      },
    );

    return await manager.save(waypointPassenger);
  }

  private assignRideChangeBlueprintTypes(target, types: BlueprintTypes): void {
    for (const [key, value] of Object.entries(types)) {
      if (value) {
        target[`apply_to_${key}`] = true;
      }
    }
  }

  private assignRecurringDays(target, daysOfService: DaysOfService | RecurringDaysDriverMap): void {
    for (const day of Object.keys(daysOfService)) {
      if (daysOfService[day]) {
        target[`recurs_on_${day}`] = true;
      }
    }
  }

  private findWithRelations(alias: string): SelectQueryBuilder<RideRoute> {
    return this.repository.createQueryBuilder('t')
      .leftJoinAndMapMany(`${alias}.blueprints`, RideBlueprint, 'bp', `bp.ride_route_id = ${alias}.id`)
      .leftJoin(RidePlace, 'ride_place', `${alias}.id = ride_place.ride_route_id`)
      .leftJoin(RideClient, 'ride_client', `${alias}.id = ride_client.ride_route_id`)

      .leftJoinAndMapMany('bp.clients', Client, 'cl', 'cl.id = ride_client.')
      .leftJoinAndMapMany(`${alias}.places`, Place, 'p', `ride_place.place_id = p.id`)
      .leftJoin(RideClient, 'ride_client', `${alias}.id = ride_client.ride_route_id`)
      .leftJoinAndMapMany(`${alias}.clients`, Client, 'c', `ride_client.client_id = c.id`);
  }
}
