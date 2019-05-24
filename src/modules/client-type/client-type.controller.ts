import { Controller } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { ClientType } from './client-type.entity';
import { ClientTypeService } from './client-type.service';
import { CreateClientTypeDto } from './dto/create-client-type.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('client-type')
@Controller('private/client-type')
export class ClientTypeController extends ControllerBase<ClientType> {
  constructor(protected service: ClientTypeService) {
    super(service, {create: CreateClientTypeDto});
  }
}
