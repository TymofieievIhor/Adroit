import { TypedEnv } from '../../env/constant';

export const BEARER_TOKEN_SECRET = ' ';
export const GLOBAL_TOKEN_SECRET = TypedEnv.GLOBAL_TOKEN_SECRET;

export const EXPIRATION_TIME = 60 * 60 * 600;

export const ROLES_METAKEY = 'roles';

export const PROTECTED_CONTROLLERS = [
    'Account',
    'AccountType',
    'ApiClient',
    'BankAccount',
    'Location',
    'LocationType',
    'Partner',
    'SignIn',
];

export const TOKEN_HEADER = 'token';
export const ACCOUNT_ID_HEADER = 'account-id';
export const REQUEST_PROPERTY_TOKEN = 'token';

export const ALLOW_ACCESS_TOKEN_METAKEY = 'allow-access-token';

export const RANDOM_BYTES_SIZE = 48;

export const MAX_SIGN_IN_ATTEMPTS = 5;

export const MAX_SIGN_IN_INTERVAL_MINUTES = 30;
