import { ObjectLiteral } from 'typeorm';
export declare abstract class EntityBase implements ObjectLiteral {
    id: number;
    uuid: string;
    updated_at: string;
    created_at: string;
    is_deleted: boolean;
    deleted_at: string;
}
