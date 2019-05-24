import { ControllerBase } from '../../common/helpers/controller.base';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactController extends ControllerBase<Contact> {
    protected service: ContactService;
    constructor(service: ContactService);
    create(body: CreateContactDto): Promise<Contact>;
}
