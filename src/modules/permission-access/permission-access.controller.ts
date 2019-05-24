import { Controller } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { PermissionAccess } from './permission-access.entity';
import { PermissionAccessService } from './permission-access.service';
import { CreatePermissionAccessDto } from './dto/create-permission-access.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('permission-access')
@Controller('private/permission-access')
export class PermissionAccessController extends ControllerBase<PermissionAccess> {
  constructor(protected service: PermissionAccessService) {
    super(service, {create: CreatePermissionAccessDto});
  }
}
