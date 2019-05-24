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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const send_confirmation_email_dto_1 = require("./dto/send-confirmation-email.dto");
const confirm_email_dto_1 = require("./dto/confirm-email.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(body, req) {
        return await this.authService.signIn(body, req);
    }
    async sendConfirmationEmail(body) {
        await this.authService.sendConfirmationEmail(body);
    }
    async confirmEmail(body) {
        return await this.authService.confirmEmail(body);
    }
};
__decorate([
    common_1.Post('/sign-in'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    common_1.Post('/send-confirmation-email'),
    swagger_1.ApiOperation({ title: 'Send confirmation email after the new password is set' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_confirmation_email_dto_1.SendConfirmationEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendConfirmationEmail", null);
__decorate([
    common_1.Post('/confirm-email'),
    swagger_1.ApiOperation({ title: 'Confirm the email' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_email_dto_1.ConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmEmail", null);
AuthController = __decorate([
    swagger_1.ApiUseTags('auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map