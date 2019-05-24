import { MAX_SIGN_IN_INTERVAL_MINUTES } from '../helpers/auth/constants';

export const SIGN_IN_CRED_MISMATCH_MSG = 'It seems that the credentials combination you provided don\'t match. Please try again';

export const SIGN_IN_EXCEED_ATTEMPTS_MSG = `You have exceeded the allowed attempts to sign in.` +
    ` Please try again in ${MAX_SIGN_IN_INTERVAL_MINUTES} minutes.`;

export const DUPLICATE_ENTRY_PHONE_NUM = 'The phone number you entered is already registered with another account. Please try using a different one.';

export const DUPLICATE_ENTRY_EMAIL = 'The email you entered is already registered with another account. Please try using a different one.';

export const MISSING_RECORD = 'The record is missing';

// trip

export const WRONG_WAYPOINT_STATUS = 'Wrong waypoint status';

export const WRONG_WAYPOINT_PASSENGER_STATUS = 'Wrong waypoint passenger status';

export const WRONG_TRIP_STATUS = 'Wrong trip status';

export const TRIP_STATUS_DOES_NOT_EXIST = 'The trip status doesn\'t exist';

export const TRIP_FIND_PARAMS_SHOULD_BE_PRESENT = 'The trip find params should be present';

export const TRIP_TYPE_UNKNOWN = 'The trip type to find is only AM or PM';

export const TRIP_DATE_OF_SERVICE_ABSENT = 'The trip date of service should be present';

// trip-orchestrator

export const RECURRING_TRIP_CREATION_ERR = 'A daily recurring trip cannot be created';

export const BP_ASSIGNMENT_NOT_FOUND = 'A ride-blueprint assignment is missing';

export const DRIVER_ID_IS_MISSING = 'No driver id was provided';

// email-confirmation

export const INVALID_TOKEN = 'Failed to confirm email';
