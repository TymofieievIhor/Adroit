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
const create_passenger_simple_dto_1 = require("./create-passenger-simple.dto");
const swagger_1 = require("@nestjs/swagger");
class CreatePassengerDto {
}
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_passenger_simple_dto_1.CreatePassengerSimpleDto)
], CreatePassengerDto.prototype, "passenger", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", Array)
], CreatePassengerDto.prototype, "locations", void 0);
__decorate([
    swagger_1.ApiModelProperty({}),
    __metadata("design:type", Array)
], CreatePassengerDto.prototype, "guardians", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CreatePassengerDto.prototype, "contacts", void 0);
exports.CreatePassengerDto = CreatePassengerDto;
//# sourceMappingURL=create-passenger.dto.js.map