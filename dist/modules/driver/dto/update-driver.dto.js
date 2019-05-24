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
const swagger_1 = require("@nestjs/swagger");
const update_simple_driver_dto_1 = require("./update-simple-driver.dto");
const update_bank_account_dto_1 = require("../../bank-account/dto/update-bank-account.dto");
const update_driver_license_dto_1 = require("../../driver-license/dto/update-driver-license.dto");
const update_vehicle_dto_1 = require("../../vehicle/dto/update-vehicle.dto");
class UpdateDriverDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", update_bank_account_dto_1.UpdateBankAccountDto)
], UpdateDriverDto.prototype, "bank_account", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", update_simple_driver_dto_1.UpdateSimpleDriverDto)
], UpdateDriverDto.prototype, "driver", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", update_driver_license_dto_1.UpdateDriverLicenseDto)
], UpdateDriverDto.prototype, "driver_license", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", update_vehicle_dto_1.UpdateVehicleDto)
], UpdateDriverDto.prototype, "vehicle", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: [1], required: false }),
    __metadata("design:type", Array)
], UpdateDriverDto.prototype, "files", void 0);
exports.UpdateDriverDto = UpdateDriverDto;
//# sourceMappingURL=update-driver.dto.js.map