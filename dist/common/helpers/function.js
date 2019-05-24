"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../../modules/api-client/constant");
const common_1 = require("@nestjs/common");
const constant_2 = require("./constant");
function extractIpAddress(req) {
    if (!req) {
        return '';
    }
    return (req.headers['x-forwarded-for'] || '').split(',').pop() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}
exports.extractIpAddress = extractIpAddress;
function allowClientDriverOrFail(client) {
    if (!(client.text_value === constant_1.API_CLIENT_TYPE.adroit_driver_android || client.text_value === constant_1.API_CLIENT_TYPE.adroit_driver_ios)) {
        throw new common_1.BadRequestException(constant_2.EXC_ENDPOINT_ACCESS_ERROR);
    }
}
exports.allowClientDriverOrFail = allowClientDriverOrFail;
//# sourceMappingURL=function.js.map