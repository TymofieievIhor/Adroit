import {Controller} from '@nestjs/common';
import {ControllerBase} from '../../common/helpers/controller.base';
import {ApiClientService} from './api-client.service';
import {ApiClient} from './api-client.entity';
import {ApiUseTags} from '@nestjs/swagger';
import {CreateApiClientDto} from './dto/create-api-client.dto';
import {UpdateApiClientDto} from './dto/update-api-client.dto';

@ApiUseTags('api-client')
@Controller('private/api-client')
export class ApiClientController extends ControllerBase<ApiClient> {
    constructor(protected service: ApiClientService) {
        super(service, {create: CreateApiClientDto, update: UpdateApiClientDto});
    }
}
