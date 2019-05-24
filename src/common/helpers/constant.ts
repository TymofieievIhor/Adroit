export const BASE_ENTITY_PROPS = [
  'deleted_at',
  'created_at',
  'updated_at',
  'id',
  'uuid',
  'is_deleted',
  'deleted_by_account_id',
  'is_archived',
  'archived_at',
  'archived_by_account_id',
];

export const BASE_PAGINATION_PROPS = [
  'page',
  'size',
  'sort',
];
export const BASE_UNIQUE_PROPS = ['email', 'phone_number'];

export const BASE_DELETED_PREFIX = 'deleted';

export type SORT_ORDER = 'ASC' | 'DESC';

export const SORT_DEFAULT = 'id';

export const PAGE_DEFAULT = 0;

export const SIZE_DEFAULT = 20;

// account

export const ACCOUNT_ID_HEADER = 'account-id';

export const DEFAULT_PASSWORD = 'ChangeMe!';

// email-confirmation

export const FROM_EMAIL = 'test';

export const EMAIL_CONFIRMATION_SUBJECT = 'Confirm your email';

export const CONFIRMATION_EMAIL_HTML = 'Hello,<br /><p>Please confirm your email address by clicking or tapping this link: </p>';

export const RESET_PASSWORD_EMAIL_SUBJECT = 'Reset your password';

export const RESET_PASSWORD_EMAIL_HTML = 'Hello,<br />Please use this temporary password to sign into your Adroit account and set a new one.' +
  '<br />Temporary password: ChangeMe!<br />Team Adroit';

export const VERIFICATION_TOKEN_EXPIRATION_TIME = '2h';

// ride-management

export const MAX_BLUEPRINT_NUMBER = 6;

export const MAX_PAYING_CLIENT_NUMBER = 6;

export const MAX_PLACE_NUMBER = 6;

export const WAYPOINT_TYPE = {
  PICKUP: 'pick_up',
  DROPOFF: 'drop_off',
};

// trip-modifier

export const INITIATE_TRIP = 'initiate_trip';

export const TRIP_SWITCH_DRIVER_ACTION = 'switch_driver';

export const TRIP_ENROUTE_WAYPOINT = 'enroute_waypoint';
export const TRIP_SET_ARRIVED_WAYPOINT_STATUS = 'set_arrived_waypoint_status';
export const TRIP_SKIP_WAYPOINT = 'skip_waypoint';
export const TRIP_COMPLETE_WAYPOINT = 'complete_waypoint';

export const TRIP_PICK_UP_PASSENGER = 'pick_up_passenger';
export const TRIP_DROP_OFF_PASSENGER = 'drop_off_passenger';
export const TRIP_SET_NO_SHOW_WAYPOINT_PASSENGER_STATUS = 'set_no_show_passenger_status';
export const TRIP_SET_CANCELED_LATE_WAYPOINT_PASSENGER_STATUS = 'set_canceled_late_waypoint_passenger_status';
export const TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS = 'set_canceled_in_advance_waypoint_passenger_status';

export const TRIP_DISPATCH_TRIP = 'dispatch_trip';
export const TRIP_ACCEPT_TRIP = 'accept_trip';
export const TRIP_DECLINE_TRIP = 'decline_trip';
export const TRIP_RESET_TRIP = 'reset_trip';

export const OBJECT_COMPARISON_STATUS_EDITED = 'E';

// trip

export const INITIAL_TRIP_STATUS = 'none';

export const TRIP_WAYPOINT_STATUSES = {
  NONE: 'none',
  ENROUTE: 'enroute',
  ARRIVED: 'arrived',
  SKIPPED: 'skipped',
  COMPLETED: 'completed',
};

export const TRIP_WAYPOINT_PASSENGER_STATUSES = {
  NONE: 'none',
  PICKED_UP: 'picked_up',
  DROPPED_OFF: 'dropped_off',
  NO_SHOW: 'no_show',
  CANCELED_LATE: 'canceled_late',
  CANCELED_IN_ADVANCE: 'canceled_in_advance',
};

export const TRIP_STATUSES = {
  NONE: 'none',
  DISPATCHED: 'dispatched',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  IN_PROGRESS: 'in_progress',
  SERVICED: 'serviced',
  NO_SHOW: 'no_show',
  CANCELED_LATE: 'canceled_late',
  CANCELED_IN_ADVANCE: 'canceled_in_advance',
};

export const CHANGE_REQ_TYPE_ACTION_MAP = {
  advance_cancel: TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS,
  driver_change: TRIP_SWITCH_DRIVER_ACTION,
};

export enum BlueprintTimeTypes {
  'am' = 'am',
  'am_late_start' = 'am late start',
  'pm' = 'pm',
  'pm_early_return' = 'pm early return',
}

export const EXC_PERMISSION_ACCESS_ERROR = 'Your user account does not have access to this application. ' +
  'Please contact support if you believe this should not be the case.';
export const EXC_ENDPOINT_ACCESS_ERROR = `You don't have permission to access this endpoint!`;

export const EXC_UNKNOWN_BLUEPRINT_TYPE = 'The blueprint type is unknown';

export const TRIP_ENTITY_STATUS_UPCOMING_LIST = [
  TRIP_STATUSES.NONE,
  TRIP_STATUSES.DISPATCHED,
  TRIP_STATUSES.ACCEPTED,
  TRIP_STATUSES.IN_PROGRESS,
];
