import {ClientType} from "../../modules/client-type/client-type.entity";
import {API_CLIENT_TYPE} from "../../modules/api-client/constant";
import {BadRequestException} from "@nestjs/common";
import {EXC_ENDPOINT_ACCESS_ERROR} from "./constant";

export function extractIpAddress(req: any): string {
  if (!req) {
    return '';
  }
  return (req.headers['x-forwarded-for'] || '').split(',').pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

export function allowClientDriverOrFail(client: ClientType) {
  if (!(client.text_value === API_CLIENT_TYPE.adroit_driver_android || client.text_value === API_CLIENT_TYPE.adroit_driver_ios)) {
    throw new BadRequestException(EXC_ENDPOINT_ACCESS_ERROR);
  }
}
