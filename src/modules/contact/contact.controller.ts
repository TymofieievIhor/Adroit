import { Body, Controller, Post } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiUseTags('contact')
@Controller('private/contact')
export class ContactController extends ControllerBase<Contact> {
  constructor(protected service: ContactService) {
    super(service, {create: CreateContactDto, update: UpdateContactDto});
  }

  @Post()
  @ApiOperation({title: 'Create a new contact'})
  async create(@Body() body: CreateContactDto): Promise<Contact> {
    return await super.create(body);
  }

}
