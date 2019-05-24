import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { ActionDto } from './trip-mutator-dto/action.dto';
import {
  TRIP_COMPLETE_WAYPOINT,
  TRIP_ENROUTE_WAYPOINT,
  INITIATE_TRIP,
  TRIP_SET_ARRIVED_WAYPOINT_STATUS,
  TRIP_SKIP_WAYPOINT,
  TRIP_SWITCH_DRIVER_ACTION,
  TRIP_WAYPOINT_STATUSES,
  TRIP_PICK_UP_PASSENGER,
  TRIP_WAYPOINT_PASSENGER_STATUSES,
  TRIP_DROP_OFF_PASSENGER,
  TRIP_SET_NO_SHOW_WAYPOINT_PASSENGER_STATUS,
  TRIP_SET_CANCELED_LATE_WAYPOINT_PASSENGER_STATUS,
  TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS,
  OBJECT_COMPARISON_STATUS_EDITED, TRIP_ACCEPT_TRIP, TRIP_STATUSES, TRIP_DECLINE_TRIP,
} from '../../common/helpers/constant';
import { TripDriver } from './entities/trip-driver.entity';
import { TripVehicle } from './entities/trip-vehicle.entity';
import { TripService } from './trip.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TripModification } from './entities/trip-modification.entity';
import { AccountService } from '../account/account.service';
import { Account } from '../account/account.entity';
import { diff } from 'deep-diff';
import { TripWaypoint } from './entities/trip-waypoint.entity';
import { TripWaypointPassenger } from './entities/trip-waypoint-passenger.entity';
import { MISSING_RECORD } from '../../common/error-handling/exception-messages';
import { TripPassenger } from './entities/trip-passenger.entity';

@Injectable()
export class TripMutatorService {

  constructor(
    private tripService: TripService,
    private accountService: AccountService,
    ) {
  }

  @Transaction()
  async dispatch(trip: Trip, action: ActionDto, @TransactionManager() manager?: EntityManager): Promise<TripModification> {
    switch (action.type) {
      case INITIATE_TRIP:
        await this.txCreateSnapshotOrFail(trip.id, action.type, action.account_id, manager);
        break;
      case TRIP_SWITCH_DRIVER_ACTION:
        // TODO: add validation
        const driver = await manager.findOneOrFail(TripDriver, {
          trip_id: trip.id,
        });
        const vehicle = await manager.findOneOrFail(TripVehicle,
          {
            trip_id: trip.id,
          });
        await this.tripService.txChangeTripDriverOrFail(
          {tripId: trip.id, currentDriverId: driver.id, newDriverId: action.payload.driver_id},
          manager,
        ); // TODO: add accountId
        await this.tripService.txChangeTripVehicleOrFail({
          tripId: trip.id,
          currentVehicleId: vehicle.id,
          newVehicleId: action.payload.vehicle_id,
          currentDriverId: driver.id,
          newDriverId: action.payload.driver_id,
        }, manager);
        break;

      case TRIP_ACCEPT_TRIP:
        await this.tripService.txChangeTripStatusOrFail(trip.id, TRIP_STATUSES.ACCEPTED, manager);
        break;
      case TRIP_DECLINE_TRIP:
        await this.tripService.txChangeTripStatusOrFail(trip.id, TRIP_STATUSES.DECLINED, manager);
        break;
      case TRIP_ENROUTE_WAYPOINT: {
        const isFirstEndpoint = manager
          .createQueryBuilder(TripWaypoint, 't')
          .where('t.id = :id', {id: action.payload.waypointId})
          .andWhere('t.order = 1')
          .getOne();
        if (isFirstEndpoint) {
          await this.tripService.txChangeTripStatusOrFail(trip.id, TRIP_STATUSES.IN_PROGRESS, manager);
        }
        await this.tripService.txChangeTripWaypointStatusOrFail(action.payload.waypointId, TRIP_WAYPOINT_STATUSES.ENROUTE, manager);
        break;
      }
      case TRIP_SET_ARRIVED_WAYPOINT_STATUS:
        await this.tripService.txChangeTripWaypointStatusOrFail(action.payload.waypointId, TRIP_WAYPOINT_STATUSES.ARRIVED, manager);
        break;
      case TRIP_SKIP_WAYPOINT:
        await this.tripService.txChangeTripWaypointStatusOrFail(action.payload.waypointId, TRIP_WAYPOINT_STATUSES.SKIPPED, manager);
        break;
      case TRIP_COMPLETE_WAYPOINT: {
        await this.tripService.txChangeTripWaypointStatusOrFail(
          action.payload.waypointId,
          TRIP_WAYPOINT_STATUSES.COMPLETED,
          manager,
        );

        const lastWaypoint = await manager
          .createQueryBuilder(TripWaypoint, 't')
          .where(`t.trip_id = :id`, {id: trip.id})
          .orderBy('order', 'DESC')
          .getOne();

        if (lastWaypoint && lastWaypoint.status === TRIP_WAYPOINT_STATUSES.COMPLETED) {
          const tripWaypointIds = (await manager.find(TripWaypoint, {trip_id: trip.id})).map((wp) => wp.id);
          const passengers = await manager.createQueryBuilder(TripWaypointPassenger, 'p')
            .where(`p.id in (${tripWaypointIds})`)
            .andWhere(`p.status IN ('${TRIP_WAYPOINT_PASSENGER_STATUSES.PICKED_UP}', '${TRIP_WAYPOINT_PASSENGER_STATUSES.DROPPED_OFF}')`)
            .getMany();

          if (passengers && passengers.length) {
            await this.tripService.txChangeTripStatusOrFail(trip.id, TRIP_STATUSES.SERVICED, manager);
          }
        } else { // make the next waypoint `ENROUTE`
          const q = manager
            .createQueryBuilder(TripWaypoint, 't')
            .where(`t.trip_id = :id`, {id: trip.id});
          const currentWaypoint = await manager.findOneOrFail(TripWaypoint, {id: action.payload.waypointId});
          const nextWaypoint = await q
            .andWhere(`t.order = :order`, {order: currentWaypoint.order + 1})
            .getOne();
          await this.tripService.txChangeTripWaypointStatusOrFail(nextWaypoint.id, TRIP_WAYPOINT_STATUSES.ENROUTE, manager);
        }
        break;
      }
      case TRIP_PICK_UP_PASSENGER:
        await this.tripService.txChangeTripWaypointPassengerStatusOrFail(
          action.payload.passengerId, TRIP_WAYPOINT_PASSENGER_STATUSES.PICKED_UP, manager,
          );
        break;
      case TRIP_DROP_OFF_PASSENGER:
        await this.tripService.txChangeTripWaypointPassengerStatusOrFail(
          action.payload.passengerId, TRIP_WAYPOINT_PASSENGER_STATUSES.DROPPED_OFF, manager,
          );
        break;
      case TRIP_SET_NO_SHOW_WAYPOINT_PASSENGER_STATUS: {
        await this.tripService.txChangeTripWaypointPassengerStatusOrFail(
          action.payload.passengerId, TRIP_WAYPOINT_PASSENGER_STATUSES.NO_SHOW, manager,
          );
        const waypoints = await manager.find(TripWaypoint, { trip_id: trip.id });
        let needToChangeTripStatusToNoShow = true;
        for (const wp of waypoints) {
          const waypointPassengers = await manager.find(TripWaypointPassenger, {trip_waypoint_id: wp.id});
          if (waypointPassengers && waypointPassengers.length) {
            for (const pass of waypointPassengers) {
              if (pass.status !== TRIP_WAYPOINT_PASSENGER_STATUSES.NO_SHOW) {
                needToChangeTripStatusToNoShow = false;
              }
            }
          }
        }
        if (needToChangeTripStatusToNoShow) {
          await this.tripService.txChangeTripStatusOrFail(trip.id, TRIP_STATUSES.NO_SHOW, manager);
        }
        break;
      }
      case TRIP_SET_CANCELED_LATE_WAYPOINT_PASSENGER_STATUS:
        await this.tripService.txChangeTripWaypointPassengerStatusOrFail(
          action.payload.passengerId, TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_LATE, manager,
        );
        await this.txCheckAndSetWaypointStatusesSkippedOrFail(trip.id, manager);
        await this.txCheckAndSetTripStausCanceledOrFail(trip.id, TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_LATE, manager);
        break;
      case TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS:
        await this.tripService.txChangeTripWaypointPassengerStatusOrFail(
          action.payload.passengerId, TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_IN_ADVANCE, manager,
          );
        await this.txCheckAndSetWaypointStatusesSkippedOrFail(trip.id, manager);
        await this.txCheckAndSetTripStausCanceledOrFail(trip.id, TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_IN_ADVANCE, manager);
        break;
    }

    return await this.txCreateSnapshotOrFail(trip.id, action.type, action.account_id, manager);

  }

  private async txCheckAndSetTripStausCanceledOrFail(tripId: number, passengerStatus: string, manager: EntityManager): Promise<void> {
    const tripPassengerIds = (await manager.find(TripPassenger, {trip_id: tripId})).map((p) => p.id);
    const tripWaypointIds = (await manager.find(TripWaypoint, {trip_id: tripId})).map((wp) => wp.id);

    if (tripPassengerIds.length && tripPassengerIds.length) {
      const tripWaypointPassengers = await manager
        .createQueryBuilder(TripWaypointPassenger, 'p')
        .where(`p.trip_waypoint_id IN (${tripWaypointIds.join(',')})`)
        .andWhere(`p.trip_passenger_id IN (${tripPassengerIds.join(',')})`)
        .getMany();
      const isAllPassengerStatusesCanceled = tripWaypointPassengers.length
        &&
        tripWaypointPassengers.every((p) => p.status === passengerStatus);
      if (isAllPassengerStatusesCanceled) {
        await this.tripService.txChangeTripStatusOrFail(
          tripId,
          passengerStatus.includes('advance') ? TRIP_STATUSES.CANCELED_IN_ADVANCE : TRIP_STATUSES.CANCELED_LATE,
          manager,
        );
      }
    }
  }

  private async txCheckAndSetWaypointStatusesSkippedOrFail(tripId: number, manager: EntityManager): Promise<void> {
    const tripWaypoint = (await manager.find(TripWaypoint, {trip_id: tripId})).map((wp) => wp.id);
    if (!tripWaypoint.length) {
      throw new BadRequestException(MISSING_RECORD);
    }
    for (const id of tripWaypoint) {
      const waypointPassengers = await manager.find(TripWaypointPassenger, {trip_waypoint_id: id});
      const isAllPassengersStatusCanceled = waypointPassengers.length && waypointPassengers.every(
        (v) => v.status === TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_LATE
          ||
          v.status === TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_IN_ADVANCE,
      );
      if (isAllPassengersStatusCanceled) {
        await this.tripService.txChangeTripWaypointStatusOrFail(id, TRIP_WAYPOINT_STATUSES.SKIPPED, manager);
      }
    }
  }

  private async txCreateSnapshotOrFail(tripId: number, actionType: string, accountId: number, manager: EntityManager): Promise<TripModification> {
    const snapshot = Object.assign(
      new TripModification(),
      {
        trip_id: tripId,
        action_type: actionType,
      },
    );

    const account = await this.accountService
      .findWithRelations('a', manager.createQueryBuilder(Account, 'a'))
      .andWhere(`a.id = :id`, {id: accountId})
      .getOne();

    if (account) {
      snapshot.account_id = account.id;
      snapshot.first_name = account.first_name;
      snapshot.last_name = account.last_name;
      snapshot.account_type = account.account_type.name;
    }

    const trip = await this.tripService
      .findWithRelations(manager.createQueryBuilder(Trip, 't'))
      .andWhere('t.id = :id', {id: tripId})
      .getOne();

    if (!trip) {
      throw new BadRequestException('The trip is missing');
    }

    snapshot.json_trip_state = JSON.stringify(trip);

    const lastSnapshot = await manager.createQueryBuilder(TripModification, 't')
      .where({trip_id: tripId})
      .orderBy(
        'dispatched_at',
        'DESC',
      )
      .getOne();

    snapshot.json_new_values = JSON.stringify(lastSnapshot
      ?
      this.compareObjects(trip, JSON.parse(lastSnapshot.json_trip_state))
        :
      'initial',
      );

    return await manager.save(snapshot);

  }

  private compareObjects(oldObj, newObj): object {
    const result = {};
    const differenceArr =  diff(oldObj, newObj);
    for (const d of differenceArr) {
      if (d.kind === OBJECT_COMPARISON_STATUS_EDITED) {
        result[`trip.${d.path.join('.')}`] = d.rhs;
      }
    }
    return result;
  }

}
