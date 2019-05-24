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
const typeorm_1 = require("typeorm");
const sign_in_entity_1 = require("./sign-in.entity");
const typeorm_2 = require("@nestjs/typeorm");
const service_base_1 = require("../../common/helpers/service.base");
let SignInLogService = class SignInLogService extends service_base_1.ServiceBase {
    constructor(repository) {
        super(sign_in_entity_1.SignIn, repository);
        this.repository = repository;
    }
    async checkIfSignInIsAllowed(login, periodMin, attempts) {
        const date = new Date(Date.now() - (periodMin * 60 * 1000));
        const isEmail = login.includes('@');
        const q = this.repository
            .createQueryBuilder('t')
            .where(`${isEmail ? 't.email' : 't.phone_number'} = :login`, { login })
            .andWhere('t.is_success != true')
            .orderBy('t.created_at', 'DESC');
        const failedSignIns = await q.getMany();
        if (!failedSignIns[attempts - 1]) {
            return true;
        }
        return (+new Date(failedSignIns[attempts - 1].created_at) - +date) < 0;
    }
};
SignInLogService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(sign_in_entity_1.SignIn)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SignInLogService);
exports.SignInLogService = SignInLogService;
//# sourceMappingURL=sign-in-log.service.js.map