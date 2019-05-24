import { SetArchivedStatusDto } from '../../modules/client/dto/set-archived-status.dto';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
export declare class UtilsService<T extends {
    is_archived: boolean;
    archived_at: string;
}> {
    setArchivedStatusById(id: number, body: SetArchivedStatusDto, queryBuilder: (alias: any) => SelectQueryBuilder<T>, repo: Repository<T>): Promise<void>;
    modifyArrayEntities(data: any[], service: any, manager: EntityManager, ownerData?: {
        name: string;
        id: number;
    }, accountId?: number): Promise<void>;
}
