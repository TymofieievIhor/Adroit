export declare const BASE_ENTITY_PROPS: string[];
export declare const BASE_PAGINATION_PROPS: string[];
export declare const BASE_UNIQUE_PROPS: string[];
export declare const BASE_DELETED_PREFIX = "deleted";
export declare type SORT_ORDER = 'ASC' | 'DESC';
export declare const SORT_DEFAULT = "id";
export declare const PAGE_DEFAULT = 0;
export declare const SIZE_DEFAULT = 20;
export declare const ACCOUNT_ID_HEADER = "account-id";
export declare const DEFAULT_PASSWORD = "ChangeMe!";
export declare const FROM_EMAIL = "test";
export declare const EMAIL_CONFIRMATION_SUBJECT = "Confirm your email";
export declare const CONFIRMATION_EMAIL_HTML = "Hello,<br /><p>Please confirm your email address by clicking or tapping this link: </p>";
export declare const RESET_PASSWORD_EMAIL_SUBJECT = "Reset your password";
export declare const RESET_PASSWORD_EMAIL_HTML: string;
export declare const VERIFICATION_TOKEN_EXPIRATION_TIME = "2h";
export declare const MAX_BLUEPRINT_NUMBER = 6;
export declare const MAX_PAYING_CLIENT_NUMBER = 6;
export declare const MAX_PLACE_NUMBER = 6;
export declare const WAYPOINT_TYPE: {
    PICKUP: string;
    DROPOFF: string;
};
export declare const INITIATE_TRIP = "initiate_trip";
export declare const TRIP_SWITCH_DRIVER_ACTION = "switch_driver";
export declare const TRIP_ENROUTE_WAYPOINT = "enroute_waypoint";
export declare const TRIP_SET_ARRIVED_WAYPOINT_STATUS = "set_arrived_waypoint_status";
export declare const TRIP_SKIP_WAYPOINT = "skip_waypoint";
export declare const TRIP_COMPLETE_WAYPOINT = "complete_waypoint";
export declare const TRIP_PICK_UP_PASSENGER = "pick_up_passenger";
export declare const TRIP_DROP_OFF_PASSENGER = "drop_off_passenger";
export declare const TRIP_SET_NO_SHOW_WAYPOINT_PASSENGER_STATUS = "set_no_show_passenger_status";
export declare const TRIP_SET_CANCELED_LATE_WAYPOINT_PASSENGER_STATUS = "set_canceled_late_waypoint_passenger_status";
export declare const TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS = "set_canceled_in_advance_waypoint_passenger_status";
export declare const TRIP_DISPATCH_TRIP = "dispatch_trip";
export declare const TRIP_ACCEPT_TRIP = "accept_trip";
export declare const TRIP_DECLINE_TRIP = "decline_trip";
export declare const TRIP_RESET_TRIP = "reset_trip";
export declare const OBJECT_COMPARISON_STATUS_EDITED = "E";
export declare const INITIAL_TRIP_STATUS = "none";
export declare const TRIP_WAYPOINT_STATUSES: {
    NONE: string;
    ENROUTE: string;
    ARRIVED: string;
    SKIPPED: string;
    COMPLETED: string;
};
export declare const TRIP_WAYPOINT_PASSENGER_STATUSES: {
    NONE: string;
    PICKED_UP: string;
    DROPPED_OFF: string;
    NO_SHOW: string;
    CANCELED_LATE: string;
    CANCELED_IN_ADVANCE: string;
};
export declare const TRIP_STATUSES: {
    NONE: string;
    DISPATCHED: string;
    ACCEPTED: string;
    DECLINED: string;
    IN_PROGRESS: string;
    SERVICED: string;
    NO_SHOW: string;
    CANCELED_LATE: string;
    CANCELED_IN_ADVANCE: string;
};
export declare const CHANGE_REQ_TYPE_ACTION_MAP: {
    advance_cancel: string;
    driver_change: string;
};
export declare enum BlueprintTimeTypes {
    'am' = "am",
    'am_late_start' = "am_late_start",
    'pm' = "pm",
    'pm_early_return' = "pm_early_return"
}
export declare const EXC_PERMISSION_ACCESS_ERROR: string;
export declare const EXC_ENDPOINT_ACCESS_ERROR = "You don't have permission to access this endpoint!";
export declare const EXC_UNKNOWN_BLUEPRINT_TYPE = "The blueprint type is unknown";
export declare const TRIP_ENTITY_STATUS_UPCOMING_LIST: string[];
