import { Repository } from 'typeorm';
import { SignIn } from './sign-in.entity';
import { ServiceBase } from '../../common/helpers/service.base';
export declare class SignInLogService extends ServiceBase<SignIn> {
    protected readonly repository: Repository<SignIn>;
    constructor(repository: Repository<SignIn>);
    checkIfSignInIsAllowed(login: string, periodMin: number, attempts: number): Promise<boolean>;
}
