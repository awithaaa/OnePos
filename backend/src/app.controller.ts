import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorator/public.decorator';

@Controller('api')
export class AppController {
  @Get()
  @Public()
  getStatus() {
    return { status: 'ok' };
  }
}
