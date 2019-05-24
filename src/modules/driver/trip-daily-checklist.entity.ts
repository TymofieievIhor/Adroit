import { EntityBase } from '../../common/helpers/entity.base';
import { Column, Entity} from 'typeorm';

@Entity()
export class TripDailyChecklist extends EntityBase {

    @Column()
    driver_id: number;

    @Column({nullable: false})
    api_client: number;

    @Column({nullable: false})
    confirmation_ip: string;

    @Column('date', {nullable: false})
    confirmed_date: string = new Date().toJSON().split('T')[0];
}
