"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_ENTITY_PROPS = [
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
exports.BASE_PAGINATION_PROPS = [
    'page',
    'size',
    'sort',
];
exports.BASE_UNIQUE_PROPS = ['email', 'phone_number'];
exports.BASE_DELETED_PREFIX = 'deleted';
exports.SORT_DEFAULT = 'id';
exports.PAGE_DEFAULT = 0;
exports.SIZE_DEFAULT = 20;
exports.ACCOUNT_ID_HEADER = 'account-id';
exports.DEFAULT_PASSWORD = 'ChangeMe!';
exports.FROM_EMAIL = 'test';
exports.EMAIL_CONFIRMATION_SUBJECT = 'Confirm your email';
exports.CONFIRMATION_EMAIL_HTML = 'Hello,<br /><p>Please confirm your email address by clicking or tapping this link: </p>';
exports.RESET_PASSWORD_EMAIL_SUBJECT = 'Reset your password';
exports.RESET_PASSWORD_EMAIL_HTML = 'Hello,<br />Please use this temporary password to sign into your Adroit account and set a new one.' +
    '<br />Temporary password: ChangeMe!<br />Team Adroit';
exports.VERIFICATION_TOKEN_EXPIRATION_TIME = '2h';
exports.MAX_BLUEPRINT_NUMBER = 6;
exports.MAX_PAYING_CLIENT_NUMBER = 6;
exports.MAX_PLACE_NUMBER = 6;
exports.WAYPOINT_TYPE = {
    PICKUP: 'pick_up',
    DROPOFF: 'drop_off',
};
exports.INITIATE_TRIP = 'initiate_trip';
exports.TRIP_SWITCH_DRIVER_ACTION = 'switch_driver';
exports.TRIP_ENROUTE_WAYPOINT = 'enroute_waypoint';
exports.TRIP_SET_ARRIVED_WAYPOINT_STATUS = 'set_arrived_waypoint_status';
exports.TRIP_SKIP_WAYPOINT = 'skip_waypoint';
exports.TRIP_COMPLETE_WAYPOINT = 'complete_waypoint';
exports.TRIP_PICK_UP_PASSENGER = 'pick_up_passenger';
exports.TRIP_DROP_OFF_PASSENGER = 'drop_off_passenger';
exports.TRIP_SET_NO_SHOW_WAYPOINT_PASSENGER_STATUS = 'set_no_show_passenger_status';
exports.TRIP_SET_CANCELED_LATE_WAYPOINT_PASSENGER_STATUS = 'set_canceled_late_waypoint_passenger_status';
exports.TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS = 'set_canceled_in_advance_waypoint_passenger_status';
exports.TRIP_DISPATCH_TRIP = 'dispatch_trip';
exports.TRIP_ACCEPT_TRIP = 'accept_trip';
exports.TRIP_DECLINE_TRIP = 'decline_trip';
exports.TRIP_RESET_TRIP = 'reset_trip';
exports.OBJECT_COMPARISON_STATUS_EDITED = 'E';
exports.INITIAL_TRIP_STATUS = 'none';
exports.TRIP_WAYPOINT_STATUSES = {
    NONE: 'none',
    ENROUTE: 'enroute',
    ARRIVED: 'arrived',
    SKIPPED: 'skipped',
    COMPLETED: 'completed',
};
exports.TRIP_WAYPOINT_PASSENGER_STATUSES = {
    NONE: 'none',
    PICKED_UP: 'picked_up',
    DROPPED_OFF: 'dropped_off',
    NO_SHOW: 'no_show',
    CANCELED_LATE: 'canceled_late',
    CANCELED_IN_ADVANCE: 'canceled_in_advance',
};
exports.TRIP_STATUSES = {
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
exports.CHANGE_REQ_TYPE_ACTION_MAP = {
    advance_cancel: exports.TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS,
    driver_change: exports.TRIP_SWITCH_DRIVER_ACTION,
};
var BlueprintTimeTypes;
(function (BlueprintTimeTypes) {
    BlueprintTimeTypes["am"] = "am";
    BlueprintTimeTypes["am_late_start"] = "am_late_start";
    BlueprintTimeTypes["pm"] = "pm";
    BlueprintTimeTypes["pm_early_return"] = "pm_early_return";
})(BlueprintTimeTypes = exports.BlueprintTimeTypes || (exports.BlueprintTimeTypes = {}));
exports.EXC_PERMISSION_ACCESS_ERROR = 'Your user account does not have access to this application. ' +
    'Please contact support if you believe this should not be the case.';
exports.EXC_ENDPOINT_ACCESS_ERROR = `You don't have permission to access this endpoint!`;
exports.EXC_UNKNOWN_BLUEPRINT_TYPE = 'The blueprint type is unknown';
exports.TRIP_ENTITY_STATUS_UPCOMING_LIST = [
    exports.TRIP_STATUSES.NONE,
    exports.TRIP_STATUSES.DISPATCHED,
    exports.TRIP_STATUSES.ACCEPTED,
    exports.TRIP_STATUSES.IN_PROGRESS,
];
//# sourceMappingURL=constant.js.map