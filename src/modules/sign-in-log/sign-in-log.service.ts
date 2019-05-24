import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {SignIn} from './sign-in.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {ServiceBase} from '../../common/helpers/service.base';

@Injectable()
export class SignInLogService extends ServiceBase<SignIn> {
    constructor(@InjectRepository(SignIn) protected readonly repository: Repository<SignIn>){
        super(SignIn, repository);
    }

    async checkIfSignInIsAllowed(login: string, periodMin: number, attempts: number): Promise<boolean> {
        const date = new Date(Date.now() -  (periodMin * 60 * 1000));
        const isEmail = login.includes('@');
        const q = this.repository
          .createQueryBuilder('t')
          .where(`${isEmail ? 't.email' : 't.phone_number'} = :login`, {login})
          .andWhere('t.is_success != true')
          .orderBy('t.created_at', 'DESC');
          // .skip(attempts - 1);

        const failedSignIns = await q.getMany();
        if (!failedSignIns[attempts - 1]) {
            return true;
        }
        return (+new Date(failedSignIns[attempts - 1].created_at) - +date) < 0;
    }
}
