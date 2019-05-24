import { Injectable } from '@nestjs/common';
import { Contact } from './contact.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ServiceBase } from '../../common/helpers/service.base';

@Injectable()
export class ContactService extends ServiceBase<Contact> {
  constructor(@InjectRepository(Contact) protected readonly repository: Repository<Contact>) {
    super(Contact, repository);
  }

  async updateByIdInTxChain(id: number, body: UpdateContactDto, manager?: EntityManager, owner?: {name: string, id: number}): Promise<Contact> {
    const params = {};
    if (owner) {
      params[`${owner.name}_id`] = owner.id;
    }
    const existingContact = await this.repository.findOne({id});
    if (existingContact) {
      await this.repository.update({id: existingContact.id}, Object.assign(existingContact, body, params));
      return await this.repository.findOne({id});
    }
    const contact = Object.assign(new Contact(), body, params);
    return await manager.save(contact);
  }
}
