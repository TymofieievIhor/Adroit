import {Column, Entity} from 'typeorm';
import {IsNumber, Length} from 'class-validator';
import {EntityBase} from '../../common/helpers/entity.base';

@Entity('location')
export class LocationEntity extends EntityBase {

    @Column(
      'enum',
      {enum: ['trip_start_point', 'trip_end_point', 'trip_way_point', 'school', 'business', 'home', 'community_center', 'hospital'],
      nullable: false},
      )
    type: string;

    @Column('float', {nullable: false})
    @IsNumber()
    latitude: number;

    @Column('float', {nullable: false})
    @IsNumber()
    longitude: number;

    @Column({nullable: false})
    @Length(1, 256)
    street1: string;

    @Column()
    @Length(1, 128)
    street2: string;

    @Column({nullable: false})
    @Length(1, 128)
    city: string;

    @Column({nullable: false})
    @Length(1, 64)
    state: string;

    @Column('int', {nullable: false})
    @IsNumber()
    zipcode: number;

    @Column({nullable: false})
    @Length(1, 128)
    country: string;
}