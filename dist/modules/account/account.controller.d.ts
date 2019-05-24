import { Account } from './account.entity';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ControllerBase } from '../../common/helpers/controller.base';
import { SetAccountBlockStatusDto } from './dto/set-account-block-status.dto';
import { FindAccountDto } from './dto/find-account.dto';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { UpdateAccountPasswordDto } from './dto/update-account-password.dto';
export declare class AccountController extends ControllerBase<Account> {
    protected service: AccountService;
    constructor(service: AccountService);
    create(body: CreateAccountDto): Promise<Account>;
    acceptTos(req: any): Promise<Account>;
    updatePassword(req: any, body: UpdateAccountPasswordDto): Promise<Account>;
    updateById(id: number, body: UpdateAccountDto): Promise<Account>;
    updateMe(req: any, body: UpdateAccountDto): Promise<Account>;
    find(params?: FindAccountDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Account>>;
    getMe(req: any): Promise<Account>;
    resetPassword(id: number): Promise<Account>;
    setBlockStatusById(id: number, body: SetAccountBlockStatusDto): Promise<Account>;
}
