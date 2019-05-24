import { TRIP_STATUSES } from '../constant';
import { TripLocation } from '../../../modules/trip/entities/trip-location.entity';
interface TripStatusBase {
    payload: TripLocation;
}
export interface TripStatusDispatched extends TripStatusBase {
    type: typeof TRIP_STATUSES.DISPATCHED;
}
export interface TripStatusAccepted extends TripStatusBase {
    type: typeof TRIP_STATUSES.ACCEPTED;
}
export interface TripStatusDeclined extends TripStatusBase {
    type: typeof TRIP_STATUSES.DECLINED;
}
export interface TripStatusInProgress extends TripStatusBase {
    type: typeof TRIP_STATUSES.IN_PROGRESS;
}
export interface TripStatusServiced extends TripStatusBase {
    type: typeof TRIP_STATUSES.SERVICED;
}
export interface TripStatusNoShow extends TripStatusBase {
    type: typeof TRIP_STATUSES.NO_SHOW;
}
export interface TripStatusCanceledLate extends TripStatusBase {
    type: typeof TRIP_STATUSES.CANCELED_LATE;
}
export interface TripStatusCanceledInAdvance extends TripStatusBase {
    type: typeof TRIP_STATUSES.CANCELED_IN_ADVANCE;
}
export declare type TripActions = TripStatusDispatched | TripStatusAccepted | TripStatusDeclined | TripStatusInProgress | TripStatusServiced | TripStatusNoShow | TripStatusCanceledLate | TripStatusCanceledInAdvance;
export {};
