import { Controller, Get } from '@nestjs/common';
import { Connection } from './connection/connection';

@Controller('provider-learn')
export class ProviderController {
  constructor(private connection: Connection) {}

  @Get('connection')
  getName(): string {
    return this.connection.getName();
  }
}
