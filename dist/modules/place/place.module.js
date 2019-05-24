"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const place_controller_1 = require("./place.controller");
const typeorm_1 = require("@nestjs/typeorm");
const place_entity_1 = require("./entities/place.entity");
const location_module_1 = require("../location/location.module");
const place_service_1 = require("./place.service");
const utils_module_1 = require("../../common/utils/utils.module");
const time_zone_module_1 = require("../time-zone/time-zone.module");
let PlaceModule = class PlaceModule {
};
PlaceModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([place_entity_1.Place]),
            location_module_1.LocationModule,
            utils_module_1.UtilsModule,
            time_zone_module_1.TimeZoneModule,
        ],
        providers: [place_service_1.PlaceService],
        controllers: [place_controller_1.PlaceController],
        exports: [place_service_1.PlaceService],
    })
], PlaceModule);
exports.PlaceModule = PlaceModule;
//# sourceMappingURL=place.module.js.map