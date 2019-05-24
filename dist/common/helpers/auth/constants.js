"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../../env/constant");
exports.BEARER_TOKEN_SECRET = ' ';
exports.GLOBAL_TOKEN_SECRET = constant_1.TypedEnv.GLOBAL_TOKEN_SECRET;
exports.EXPIRATION_TIME = 60 * 60 * 600;
exports.ROLES_METAKEY = 'roles';
exports.PROTECTED_CONTROLLERS = [
    'Account',
    'AccountType',
    'ApiClient',
    'BankAccount',
    'Location',
    'LocationType',
    'Partner',
    'SignIn',
];
exports.TOKEN_HEADER = 'token';
exports.ACCOUNT_ID_HEADER = 'account-id';
exports.REQUEST_PROPERTY_TOKEN = 'token';
exports.ALLOW_ACCESS_TOKEN_METAKEY = 'allow-access-token';
exports.RANDOM_BYTES_SIZE = 48;
exports.MAX_SIGN_IN_ATTEMPTS = 5;
exports.MAX_SIGN_IN_INTERVAL_MINUTES = 30;
//# sourceMappingURL=constants.js.map