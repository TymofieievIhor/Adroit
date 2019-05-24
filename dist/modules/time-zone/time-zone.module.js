"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const time_zone_controller_1 = require("./time-zone.controller");
const time_zone_service_1 = require("./time-zone.service");
const typeorm_1 = require("@nestjs/typeorm");
const time_zone_entity_1 = require("./time-zone.entity");
let TimeZoneModule = class TimeZoneModule {
};
TimeZoneModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([time_zone_entity_1.TimeZone])],
        controllers: [time_zone_controller_1.TimeZoneController],
        providers: [time_zone_service_1.TimeZoneService],
        exports: [time_zone_service_1.TimeZoneService],
    })
], TimeZoneModule);
exports.TimeZoneModule = TimeZoneModule;
//# sourceMappingURL=time-zone.module.js.map