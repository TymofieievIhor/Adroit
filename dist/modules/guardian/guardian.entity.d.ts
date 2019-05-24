import { EntityBase } from '../../common/helpers/entity.base';
export declare class Guardian extends EntityBase {
    account_id: number;
    passenger_id: number;
    relationship: string;
    account?: Account;
}
