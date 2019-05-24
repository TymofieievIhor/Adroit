import {CanActivate, ExecutionContext, Injectable, InternalServerErrorException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {
    ALLOW_ACCESS_TOKEN_METAKEY,
    PROTECTED_CONTROLLERS,
    REQUEST_PROPERTY_TOKEN,
    ROLES_METAKEY,
} from '../../../common/helpers/auth/constants';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const handler = context.getHandler();
        const ctrlName = context.getClass().name;

        if (!ctrlName) {
            throw new InternalServerErrorException('controller name unavailable');
        }

        const request = context.switchToHttp().getRequest();

        // if (request[REQUEST_PROPERTY_TOKEN]) {
        //     if (this.reflector.get<string[]>(ALLOW_ACCESS_TOKEN_METAKEY, handler)) {
        //         return true;
        //     }
        // }

        const roles = this.reflector.get<string[]>(ROLES_METAKEY, handler);

        if (!PROTECTED_CONTROLLERS.includes(ctrlName) && !roles) {
            return true;
        }
        const user = request.user;

        if (!user || !user.account || !user.account_type) {
            return false;
        }

        return roles.includes(user.account_type);
    }

}