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
const constrant_1 = require("../../../common/constrant");
class RecurringDaysDriverMap {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'monday' }),
    __metadata("design:type", String)
], RecurringDaysDriverMap.prototype, "day", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 1 }),
    __metadata("design:type", Number)
], RecurringDaysDriverMap.prototype, "driver_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    __metadata("design:type", Number)
], RecurringDaysDriverMap.prototype, "add_pay", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    __metadata("design:type", Number)
], RecurringDaysDriverMap.prototype, "deduct_pay", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 1000 }),
    __metadata("design:type", Number)
], RecurringDaysDriverMap.prototype, "estimated_driver_payout", void 0);
exports.RecurringDaysDriverMap = RecurringDaysDriverMap;
class CreateBlueprintAssignmentDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: constrant_1.api_examples.date, required: true }),
    __metadata("design:type", String)
], CreateBlueprintAssignmentDto.prototype, "service_start_date", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: constrant_1.api_examples.date, required: true }),
    __metadata("design:type", String)
], CreateBlueprintAssignmentDto.prototype, "service_end_date", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, type: RecurringDaysDriverMap, isArray: true }),
    __metadata("design:type", Array)
], CreateBlueprintAssignmentDto.prototype, "recurring_days_drivers", void 0);
exports.CreateBlueprintAssignmentDto = CreateBlueprintAssignmentDto;
//# sourceMappingURL=create-blueprint-assignment.dto.js.map