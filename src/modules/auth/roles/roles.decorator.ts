import {ReflectMetadata} from '@nestjs/common';
import {ROLES_METAKEY} from '../../../common/helpers/auth/constants';

export const Roles = (...roles: string[]) => ReflectMetadata(ROLES_METAKEY, roles);