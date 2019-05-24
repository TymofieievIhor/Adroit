import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trip_modification')
export class TripModification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  trip_id: number;

  @Column()
  account_id: number;

  @Column()
  account_type: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({nullable: false})
  action_type: string;

  @Column({nullable: false})
  json_new_values: string;

  @Column({nullable: false})
  json_trip_state: string;

  @Column({nullable: false})
  dispatched_at: string;
}