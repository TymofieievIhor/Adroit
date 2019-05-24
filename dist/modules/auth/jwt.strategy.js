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
const passport_jwt_1 = require("passport-jwt");
const auth_service_1 = require("./auth.service");
const passport = require("passport");
const constants_1 = require("../../common/helpers/auth/constants");
const common_1 = require("@nestjs/common");
let JwtStrategy = class JwtStrategy extends passport_jwt_1.Strategy {
    constructor(authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: constants_1.BEARER_TOKEN_SECRET,
        }, async (payload, next) => await this.verify(payload, next));
        this.authService = authService;
        passport.use(this);
        const self = this;
        const originalAuth = self.authenticate;
        self.authenticate = async function (req) {
            if (req.headers[constants_1.TOKEN_HEADER]) {
                try {
                    if (!req.headers[constants_1.ACCOUNT_ID_HEADER]) {
                        this.fail();
                    }
                    req[constants_1.REQUEST_PROPERTY_TOKEN] = await self.authService.decodeToken(req.headers[constants_1.TOKEN_HEADER], req.headers[constants_1.ACCOUNT_ID_HEADER]);
                    return this.success();
                }
                catch (err) {
                    return this.fail();
                }
            }
            else {
                return this.fail();
            }
        };
    }
    async verify(payload, done) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done('Unauthorized', false);
        }
        return done(null, payload);
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map