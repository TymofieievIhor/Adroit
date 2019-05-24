import { EntityBase } from '../../../common/helpers/entity.base';
import { RideBlueprint } from './ride-blueprint.entity';
import { Place } from '../../place/entities/place.entity';
import { Client } from '../../client/client.entity';
export declare class RideRoute extends EntityBase {
    has_am: boolean;
    has_am_late_start: boolean;
    has_pm: boolean;
    has_pm_early_return: boolean;
    is_recurring: boolean;
    is_active: boolean;
    is_archived: boolean;
    archived_at: string;
    archived_by_account_id: number;
    deleted_by_account_id: number;
    blueprints: RideBlueprint[];
    places: Place[];
    clients: Client[];
}
