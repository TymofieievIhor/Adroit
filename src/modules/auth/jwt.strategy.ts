import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from './auth.service';
import * as passport from 'passport';
import {
    BEARER_TOKEN_SECRET,
    REQUEST_PROPERTY_TOKEN,
    TOKEN_HEADER,
    ACCOUNT_ID_HEADER,
} from '../../common/helpers/auth/constants';
import {Injectable} from '@nestjs/common';

@Injectable()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: BEARER_TOKEN_SECRET,
        },
        async (payload, next) => await this.verify(payload, next));

        passport.use(this);

        const self = this as any;
        const originalAuth = self.authenticate;

        self.authenticate = async function(req) {
            if (req.headers[TOKEN_HEADER]) {
                try {
                    if (!req.headers[ACCOUNT_ID_HEADER]) {
                        this.fail();
                    }
                    req[REQUEST_PROPERTY_TOKEN] = await self.authService.decodeToken(req.headers[TOKEN_HEADER], req.headers[ACCOUNT_ID_HEADER]);
                    return this.success();
                } catch (err) {
                    return this.fail();
                }
            }
            else {
                return this.fail();
                // originalAuth.call(this, req);
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

}