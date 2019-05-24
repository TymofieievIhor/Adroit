import { EntityBase } from '../../../common/helpers/entity.base';
import { LocationEntity } from '../../location/location.entity';
import { TimeZone } from '../../time-zone/time-zone.entity';
export declare class Place extends EntityBase {
    name: string;
    time_zone_id: number;
    phone_number: string;
    phone_extension: string;
    location_id: number;
    default_start_time: string;
    default_end_time: string;
    default_late_start_time: string;
    default_early_end_time: string;
    is_archived: boolean;
    archived_at: string;
    location: LocationEntity;
    time_zone: TimeZone;
}
