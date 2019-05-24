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
const create_bank_account_dto_1 = require("../../bank-account/dto/create-bank-account.dto");
const simple_driver_dto_1 = require("./simple-driver.dto");
const create_vehicle_dto_1 = require("../../vehicle/dto/create-vehicle.dto");
const create_driver_license_dto_1 = require("../../driver-license/dto/create-driver-license.dto");
const create_account_dto_1 = require("../../account/dto/create-account.dto");
class CreateDriverDto {
}
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_bank_account_dto_1.CreateBankAccountDto)
], CreateDriverDto.prototype, "bank_account", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", simple_driver_dto_1.SimpleDriverDto)
], CreateDriverDto.prototype, "driver", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_account_dto_1.CreateAccountDto)
], CreateDriverDto.prototype, "account", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_driver_license_dto_1.CreateDriverLicenseDto)
], CreateDriverDto.prototype, "driver_license", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_vehicle_dto_1.CreateVehicleDto)
], CreateDriverDto.prototype, "vehicle", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: [1], required: false }),
    __metadata("design:type", Array)
], CreateDriverDto.prototype, "files", void 0);
exports.CreateDriverDto = CreateDriverDto;
//# sourceMappingURL=create-driver.dto.js.map