import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  ping(): { message: string } {
    return { message: 'OK' };
  }
}
