import { Body, Controller, Post } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { Guardian } from './guardian.entity';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { GuardianService } from './guardian.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('guardian')
@Controller('private/guardian')
export class GuardianController extends ControllerBase<Guardian> {
  constructor(protected service: GuardianService) {
    super(service, {create: CreateGuardianDto});
  }

  @Post()
  @ApiOperation({title: 'Create a new guardian'})
  async create(@Body() body: CreateGuardianDto): Promise<Guardian> {
    return await super.create(body);
  }
}
