import { Body, Controller, Post } from '@nestjs/common';
import { TripOrchestratorService } from './trip-orchestrator.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { Trip } from './entities/trip.entity';
import { CreateDailyRecurringTripDto } from './dto/create-daily-recurring-trip.dto';

@Controller('private/trip-orchestrator')
@ApiUseTags('trip-orchestrator')
export class TripOrchestratorController {
  constructor(protected service: TripOrchestratorService) {
  }

  @Post('/')
  @ApiOperation({title: 'Create a daily recurring trip'})
  async createDailyRecurringTrip(@Body() body: CreateDailyRecurringTripDto): Promise<Trip> {
    return this.service.createDailyRecurringTrip(body);
  }
}