"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const time_zone_service_1 = require("./time-zone.service");
const create_time_zone_dto_1 = require("./dto/create-time-zone.dto");
const controller_base_1 = require("../../common/helpers/controller.base");
let TimeZoneController = class TimeZoneController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_time_zone_dto_1.CreateTimeZoneDto });
        this.service = service;
    }
};
TimeZoneController = __decorate([
    common_1.Controller('private/time-zone'),
    __metadata("design:paramtypes", [time_zone_service_1.TimeZoneService])
], TimeZoneController);
exports.TimeZoneController = TimeZoneController;
//# sourceMappingURL=time-zone.controller.js.map