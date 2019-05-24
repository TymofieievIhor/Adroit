import { Body, Controller, Post, Patch, Param, Get, Req, Query } from '@nestjs/common';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ControllerBase } from '../../common/helpers/controller.base';
import { SetAccountBlockStatusDto } from './dto/set-account-block-status.dto';
import { ACCOUNT_ID_HEADER } from '../../common/helpers/constant';
import { FindAccountDto } from './dto/find-account.dto';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { ConfirmEmailDto } from '../auth/dto/confirm-email.dto';
import { UpdateAccountPasswordDto } from './dto/update-account-password.dto';

@ApiUseTags('account')
@Controller('private/account')
export class AccountController extends ControllerBase<Account>{
    constructor(protected service: AccountService) {
        super(service, { create: CreateAccountDto, update: UpdateAccountDto });
    }

    @Post()
    @ApiOperation({ title: 'Create a new account' })
    async create(@Body() body: CreateAccountDto) {
        return await super.create(body);
    }

    @Patch('/accept-tos')
    @ApiOperation({ title: 'Accept ToS for the current account' })
    async acceptTos(@Req() req: any): Promise<Account> {
        await super.validateId(req.headers[ACCOUNT_ID_HEADER]);
        return await this.service.acceptTos(req.headers[ACCOUNT_ID_HEADER], req);
    }

    @Patch('/update-my-password')
    @ApiOperation({ title: 'Update the password for the authorized account' })
    async updatePassword(@Req() req: any, @Body() body: UpdateAccountPasswordDto): Promise<Account> {
        return await this.service.updatePassword(req.headers[ACCOUNT_ID_HEADER], body);
    }

    @Patch(':id')
    @ApiOperation({ title: 'Update an account by id' })
    async updateById(@Param('id') id: number, @Body() body: UpdateAccountDto): Promise<Account> {
        await super.validateId(id);
        return await this.service.updateById(id, body);
    }

    @Patch()
    @ApiOperation({ title: 'Update the current account' })
    async updateMe(@Req() req: any, @Body() body: UpdateAccountDto): Promise<Account> {
        await super.validateId(req.headers[ACCOUNT_ID_HEADER]);
        return await this.service.updateById(req.headers[ACCOUNT_ID_HEADER], body);
    }

    @Get()
    @ApiOperation({ title: 'Find all accounts' })
    async find(@Query() params?: FindAccountDto, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Account>> {
        return this.service.find(params, pagination);
    }

    @Get('/me')
    @ApiOperation({ title: 'Get the current account' })
    async getMe(@Req() req: any): Promise<Account> {
        return await this.service.findById(req.headers[ACCOUNT_ID_HEADER]);
    }

    @Patch('/:id/reset-password')
    @ApiOperation({ title: 'Reset the password (to the default one) with send email' })
    async resetPassword(@Param() id: number): Promise<Account> {
        return await this.service.resetPassword(id);
    }

    @Post('/set-block-status/:id')
    @ApiOperation({ title: 'Block/unblock an account by id' })
    async setBlockStatusById(@Param('id') id: number, @Body() body: SetAccountBlockStatusDto): Promise<Account> {
        return await this.service.setBlockStatusById(id, body);
    }
}
