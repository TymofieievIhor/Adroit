
import {Column, Entity} from 'typeorm';
import {Length} from 'class-validator';
import {EntityBase} from '../../common/helpers/entity.base';

@Entity({name: 'location_type'})
export class LocationType extends EntityBase {

    @Column('int', {nullable: false, unique: true})
    value: number;

    @Column({nullable: false})
    @Length(1, 64)
    text_value: string;

    @Column({nullable: false})
    @Length(1, 128)
    name: string;

    @Column({nullable: false, default: true})
    display_in_user_interface: boolean;
}