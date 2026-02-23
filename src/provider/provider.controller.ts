import { Controller, Get } from '@nestjs/common';
import { Connection } from './external-libraries/connection-ext';
import { MailService } from './external-libraries/mail-ext';
import { Repository } from './external-libraries/repository-ext';

@Controller('provider-learn')
export class ProviderController {
  constructor(
    private connection: Connection,
    private mailService: MailService,
    private repositoryProvider: Repository,
  ) {}

  @Get('class')
  getName(): string {
    return this.connection.getName();
  }

  @Get('value')
  mail(): string {
    return this.mailService.send();
  }

  @Get('repository')
  repository(): string {
    return this.repositoryProvider.save();
  }
}
