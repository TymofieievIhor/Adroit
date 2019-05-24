import { ServiceBase } from '../../common/helpers/service.base';
import { Trip } from './entities/trip.entity';
import { EntityManager, Repository, Transaction, TransactionManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RideBlueprint } from '../ride-management/entities/ride-blueprint.entity';
import { RideBlueprintAssignment } from '../ride-management/entities/ride-blueprint-assignment.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDailyRecurringTripDto } from './dto/create-daily-recurring-trip.dto';
import { RideRoute } from '../ride-management/entities/ride-route.entity';
import { RideBlueprintWaypoint } from '../ride-management/entities/ride-blueprint-waypoint.entity';
import {
  BASE_ENTITY_PROPS,
  BlueprintTimeTypes,
  INITIAL_TRIP_STATUS,
  INITIATE_TRIP
} from '../../common/helpers/constant';
import { RidePlace } from '../ride-management/entities/ride-place.entity';
import { Place } from '../place/entities/place.entity';
import { TripPlace } from './entities/trip-place.entity';
import { LocationEntity } from '../location/location.entity';
import { RidePlacePassenger } from '../ride-management/entities/ride-place-passenger.entity';
import { Passenger } from '../passenger/passenger.entity';
import { TripPassenger } from './entities/trip-passenger.entity';
import { TripWaypoint } from './entities/trip-waypoint.entity';
import { RideBlueprintWaypointPassenger } from '../ride-management/entities/ride-bluerprint-waypoint-passenger.entity';
import { LocationService } from '../location/location.service';
import { TripLocation } from './entities/trip-location.entity';
import { TripService } from './trip.service';
import { TripWaypointPassenger } from './entities/trip-waypoint-passenger.entity';
import { TripMutatorService } from './trip-mutator.service';
import {
  BP_ASSIGNMENT_NOT_FOUND,
  DRIVER_ID_IS_MISSING,
  RECURRING_TRIP_CREATION_ERR,
} from '../../common/error-handling/exception-messages';

@Injectable()
export class TripOrchestratorService extends ServiceBase<Trip> {
  constructor(@InjectRepository(Trip) protected readonly repository: Repository<Trip>,
              private locationService: LocationService,
              private tripService: TripService,
              private tripMutatorService: TripMutatorService,
  ) {
    super(Trip, repository);
  }

  private readonly recurringDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  @Transaction()
  async createDailyRecurringTrip(data: CreateDailyRecurringTripDto, @TransactionManager() manager?: EntityManager): Promise<Trip> {
    const rideBlueprints = await manager.find(RideBlueprint, {
      is_deleted: false,
      is_archived: false,
    });
    if (!rideBlueprints.length){
      throw new BadRequestException(`You don't have a blueprint!`);
    }
    const date = new Date(data.provided_date);
    const recurringDay = this.recurringDays[date.getDay()];

    // TODO should be an array / map
    const rideBlueprintAssignment = await manager.createQueryBuilder(RideBlueprintAssignment, 'r')
      .where(`r.ride_blueprint_id IN (${rideBlueprints.map((bp) => bp.id).join(', ')})`)
      .andWhere(`r.is_deleted != true AND r.is_archived != true`)
      .andWhere(`r.service_start_date <= :providedDate`, {providedDate: data.provided_date})
      .andWhere(`r.service_end_date >= :providedDate`, {providedDate: data.provided_date})
      .andWhere(`r.recurs_on_${recurringDay} = true`)
      .andWhere(`r.${recurringDay}_driver_id IS NOT null`)
      .getOne();

    if (!rideBlueprintAssignment) {
      throw new BadRequestException(`${RECURRING_TRIP_CREATION_ERR}: ${BP_ASSIGNMENT_NOT_FOUND}`);
    }

    const blueprint = await manager.findOne(RideBlueprint, {id: rideBlueprintAssignment.ride_blueprint_id});

    let trip: Trip = Object.assign(new Trip(), data, {
      ride_blueprint_id: rideBlueprintAssignment.ride_blueprint_id,
      camera_service_required: blueprint.camera_service_required,
      type_of_service: blueprint.type_of_service,
      date_of_service: data.provided_date,
      estimated_mileage: blueprint.estimated_mileage,
      estimated_duration_in_minutes: blueprint.estimated_duration_in_minutes,
      map_picture_url: blueprint.map_picture_url,
    });
    const rideRoute = await manager.findOne(RideRoute, {id: blueprint.ride_route_id});

    trip.type = rideRoute.is_recurring ? 'recurring' : 'scheduled';
    trip.ride_route_id = rideRoute.id;
    trip.status = INITIAL_TRIP_STATUS;
    trip = await manager.save(trip);

    const driverId = rideBlueprintAssignment[`${recurringDay}_driver_id`];

    if (!driverId) {
      throw new BadRequestException(`${RECURRING_TRIP_CREATION_ERR}: ${DRIVER_ID_IS_MISSING}`);
    }

    const tripDriver = await this.tripService.txCreateTripDriverOrFail(trip.id, driverId, manager);

    await this.tripService.txCreateTripVehicleOrFail(trip.id, tripDriver.driver_id, manager);

    const places = await manager.find(RidePlace, {ride_route_id: rideRoute.id});

    const tripPlacePromises = [];

    for (const place of places) {
      const placeData = await manager.findOneOrFail(Place, {id: place.place_id});
      const locationData = await manager.findOneOrFail(LocationEntity, {id: placeData.location_id});
      const tripPlace = Object.assign(new TripPlace(), {
        place_id: placeData.id,
        trip_id: trip.id,
        name: placeData.name,
        type_text_value: locationData.type,
        type_name: locationData.type, // TODO: clarify type - type_text_value and type_name are duplicates, remove one
      });

      const rideBlueprint = await manager.findOne(RideBlueprint, {ride_route_id: place.ride_route_id});
      let waypoint;
      if (rideBlueprint.type_text_value === BlueprintTimeTypes.am || rideBlueprint.type_text_value === BlueprintTimeTypes.am_late_start){
        waypoint = await manager.findOne(RideBlueprintWaypoint, {type: 'pick_up', ride_blueprint_id: rideBlueprint.id});
      } else {
        waypoint = await manager.findOne(RideBlueprintWaypoint, {type: 'drop_off', ride_blueprint_id: rideBlueprint.id});
      }
      const ridePassengers = await manager.find(RideBlueprintWaypointPassenger, {ride_blueprint_waypoint_id: waypoint.id});

      // const ridePassengers = await manager.find(RidePlacePassenger, {place_id: place.place_id});

      const tripPassengerPromises = [];
      for (const pass of ridePassengers) {
        const passengerData = await manager.findOneOrFail(Passenger, {id: pass.passenger_id});
        super.deleteProps(passengerData, BASE_ENTITY_PROPS);
        const tripPassenger = Object.assign(new TripPassenger(), {
            passenger_id: pass.passenger_id,
            trip_id: trip.id,
            type_text_value: passengerData.type,
            type_name: passengerData.type, // TODO: clarify type - type_text_value and type_name are duplicates, remove one
          },
          passengerData);
        tripPassengerPromises.push(manager.save(tripPassenger));

      }
      await Promise.all(tripPassengerPromises);

      tripPlacePromises.push(manager.save(tripPlace));
    }

    await Promise.all(tripPlacePromises);

    const rideBlueprintWaypoints = await manager.find(RideBlueprintWaypoint, {
      ride_blueprint_id: blueprint.id,
    });

    for (const waypoint of rideBlueprintWaypoints) {
      let tripWaypoint = Object.assign(new TripWaypoint(),
        {
          trip_id: trip.id,
          order: waypoint.order,
          type: waypoint.type,
          scheduled_arrival_time: waypoint.scheduled_arrival_time,
          status: INITIAL_TRIP_STATUS,
        },
      );

      const waypointPlace = await manager.findOneOrFail(Place, {
        id: waypoint.place_id,
      });

      const placeLocation = await manager.findOneOrFail(LocationEntity, {
        id: waypointPlace.location_id,
      });

      super.deleteProps(placeLocation, BASE_ENTITY_PROPS);

      const tripLocationPlace = Object.assign(new TripLocation(),
        placeLocation,
        {
          type_text_value: placeLocation.type,
          type_name: placeLocation.type,
        },
      );

      if (blueprint.type_text_value.toLowerCase().includes('am')) {
        tripWaypoint.drop_off_trip_location_id = tripLocationPlace.id;
      } else if (blueprint.type_text_value.toLowerCase().includes('pm')) {
        tripWaypoint.arrival_trip_location_id = tripLocationPlace.id;
        tripWaypoint.pick_up_trip_location_id = tripLocationPlace.id;
      }

      const passenger = await manager.findOne(RideBlueprintWaypointPassenger, {
        ride_blueprint_waypoint_id: waypoint.id,
      });

      let tripWaypointPassenger;
      if (passenger) {
        const tripPassenger = await manager.findOneOrFail(TripPassenger, {
          passenger_id: passenger.passenger_id,
          trip_id: trip.id,
        });

        tripWaypointPassenger = Object.assign(new TripWaypointPassenger(), {
          trip_passenger_id: tripPassenger.id,
          status: INITIAL_TRIP_STATUS,
        });

        const location = await this.locationService.findLocationByLocationLinkId(passenger.location_link_id);
        if (location && Object.keys(location).length) {
          super.deleteProps(location, BASE_ENTITY_PROPS);
          let tripLocation = Object.assign(new TripLocation(),
            location,
            {
              type_text_value: location.type,
              type_name: location.type,
            });
          tripLocation = await manager.save(tripLocation);
          if (blueprint.type_text_value.toLowerCase().includes('am')) {
            tripWaypoint.arrival_trip_location_id = tripLocation.id;
            tripWaypoint.pick_up_trip_location_id = tripLocation.id;
          } else if (blueprint.type_text_value.toLowerCase().includes('pm')) {
            tripWaypoint.drop_off_trip_location_id = tripLocation.id;
          }
        }
      }

      tripWaypoint = await manager.save(tripWaypoint);

      if (passenger) {
        tripWaypointPassenger.trip_waypoint_id = tripWaypoint.id;
        await manager.save(tripWaypointPassenger);
      }

    }

    // TODO fixes needed, manager is not aware of updates
    // await this.tripMutatorService.dispatch(trip, {
    //   type: INITIATE_TRIP,
    //   payload: {},
    // }, manager);

    return trip;
  }

}
