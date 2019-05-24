"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../helpers/auth/constants");
exports.SIGN_IN_CRED_MISMATCH_MSG = 'It seems that the credentials combination you provided don\'t match. Please try again';
exports.SIGN_IN_EXCEED_ATTEMPTS_MSG = `You have exceeded the allowed attempts to sign in.` +
    ` Please try again in ${constants_1.MAX_SIGN_IN_INTERVAL_MINUTES} minutes.`;
exports.DUPLICATE_ENTRY_PHONE_NUM = 'The phone number you entered is already registered with another account. Please try using a different one.';
exports.DUPLICATE_ENTRY_EMAIL = 'The email you entered is already registered with another account. Please try using a different one.';
exports.MISSING_RECORD = 'The record is missing';
exports.WRONG_WAYPOINT_STATUS = 'Wrong waypoint status';
exports.WRONG_WAYPOINT_PASSENGER_STATUS = 'Wrong waypoint passenger status';
exports.WRONG_TRIP_STATUS = 'Wrong trip status';
exports.TRIP_STATUS_DOES_NOT_EXIST = 'The trip status doesn\'t exist';
exports.TRIP_FIND_PARAMS_SHOULD_BE_PRESENT = 'The trip find params should be present';
exports.TRIP_TYPE_UNKNOWN = 'The trip type to find is only AM or PM';
exports.TRIP_DATE_OF_SERVICE_ABSENT = 'The trip date of service should be present';
exports.RECURRING_TRIP_CREATION_ERR = 'A daily recurring trip cannot be created';
exports.BP_ASSIGNMENT_NOT_FOUND = 'A ride-blueprint assignment is missing';
exports.DRIVER_ID_IS_MISSING = 'No driver id was provided';
exports.INVALID_TOKEN = 'Failed to confirm email';
//# sourceMappingURL=exception-messages.js.map