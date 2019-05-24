import { SignInDto } from './dto/sign-in.dto';
import { IAccountTokenPayload } from '../../common/helpers/auth/tokenPayload.interface';
import { AccountService } from '../account/account.service';
import { ApiClientService } from '../api-client/api-client.service';
import { SignInLogService } from '../sign-in-log/sign-in-log.service';
import { Account } from '../account/account.entity';
import { AccountTypeService } from '../account-type/account-type.service';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { ApiClient } from '../api-client/api-client.entity';
import { SendConfirmationEmailDto } from './dto/send-confirmation-email.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { PermissionAccessService } from '../permission-access/permission-access.service';
import { DriverService } from '../driver/driver.service';
import { Driver } from '../driver/driver.entity';
export declare class AuthService {
    private accountService;
    private apiClientService;
    private signInLogService;
    private accountTypeService;
    private permissionAccess;
    private driverService;
    constructor(accountService: AccountService, apiClientService: ApiClientService, signInLogService: SignInLogService, accountTypeService: AccountTypeService, permissionAccess: PermissionAccessService, driverService: DriverService);
    signIn(data: SignInDto, req: any): Promise<SignInResponseDto>;
    sendConfirmationEmail(data: SendConfirmationEmailDto): Promise<void>;
    confirmEmail(data: ConfirmEmailDto): Promise<SignInResponseDto>;
    getSignInResponse(account: Account, client?: ApiClient, other?: {
        firebase_token?: string;
        driver?: Driver;
    }): Promise<SignInResponseDto>;
    validateUser(accountPayload: IAccountTokenPayload): Promise<boolean>;
    createToken(payload: IAccountTokenPayload, accountSecret: string): Promise<string>;
    decodeToken(token: string, accountId: number): Promise<string | object>;
    private getAccount;
}
