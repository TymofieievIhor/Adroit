import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {BankAccountService} from './bank-account.service';
import {BankAccount} from './bank-account.entity';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {ControllerBase} from '../../common/helpers/controller.base';
import {CreateBankAccountDto} from './dto/create-bank-account.dto';
import {UpdateBankAccountDto} from './dto/update-bank-account.dto';

@ApiUseTags('bank-account')
@Controller('private/bank-account')
export class BankAccountController extends ControllerBase<BankAccount> {
    constructor(protected service: BankAccountService) {
        super(service, {create: CreateBankAccountDto, update: UpdateBankAccountDto});
    }

    @Post()
    @ApiOperation({title: 'Create a new bank account'})
    async create(@Body() body: CreateBankAccountDto) {
        return await super.create(body);
    }
}
