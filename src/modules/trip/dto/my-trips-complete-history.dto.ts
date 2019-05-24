import { ApiModelProperty } from '@nestjs/swagger';
import { Trip } from '../entities/trip.entity';

export class MyTripsCompleteHistoryDto {

    @ApiModelProperty({required: true})
    items: Trip[];

    @ApiModelProperty({required: true})
    count: number;
}