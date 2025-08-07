import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getStatus() {
    return { status: 'ok' };
  }
}
