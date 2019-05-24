import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiUseTags('app')
@Controller()
export class AppController {
  started: number;
  startedAt: Date;

  constructor() {
    this.startedAt = new Date();
    this.started = this.startedAt.getTime();
  }

  @Get()
  @ApiOperation({ title: 'Get server uptime info' })
  root() {
    return {
      since: this.startedAt,
      uptime: Date.now() - this.started,
    };
  }
}
