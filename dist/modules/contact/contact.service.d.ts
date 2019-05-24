import { Contact } from './contact.entity';
import { EntityManager, Repository } from 'typeorm';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ServiceBase } from '../../common/helpers/service.base';
export declare class ContactService extends ServiceBase<Contact> {
    protected readonly repository: Repository<Contact>;
    constructor(repository: Repository<Contact>);
    updateByIdInTxChain(id: number, body: UpdateContactDto, manager?: EntityManager, owner?: {
        name: string;
        id: number;
    }): Promise<Contact>;
}
