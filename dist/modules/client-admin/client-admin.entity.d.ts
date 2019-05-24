import { EntityBase } from '../../common/helpers/entity.base';
export declare class ClientAdmin extends EntityBase {
    account_id: number;
    client_id: number;
    title: string;
    account?: Account;
}
