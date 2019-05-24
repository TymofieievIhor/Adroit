import {Body, Controller, Post} from '@nestjs/common';
import {AccountType} from './account-type.entity';
import {AccountTypeService} from './account-type.service';
import {ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {CreateAccountTypeDto} from './dto/create-account-type.dto';
import {UpdateAccountTypeDto} from './dto/update-account-type.dto';
import {ControllerBase} from '../../common/helpers/controller.base';

@ApiUseTags('account-type')
@Controller('private/account-type')
export class AccountTypeController extends ControllerBase<AccountType>{
    constructor(protected service: AccountTypeService) {
        super(service, {create: CreateAccountTypeDto, update: UpdateAccountTypeDto});
    }

    @Post()
    @ApiOperation({title: 'Create a new account-type'})
    async create(@Body() body: CreateAccountTypeDto) {
        return await super.create(body);
    }

}
