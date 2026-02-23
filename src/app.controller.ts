import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './provider/external-libraries/mail-ext';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailService: MailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('shared-module')
  send(): string {
    return this.mailService.send();
  }
}
