import { Module } from '@nestjs/common';
import {
  Connection,
  PostgresDummy,
  MySQLDummy,
} from './external-libraries/connection-ext';
import { ProviderController } from './provider.controller';
import { createNewRepository } from './repository/repository';
import { Repository } from './external-libraries/repository-ext';
import { mailInstance } from './mail/mail';
import { MailService } from './external-libraries/mail-ext';

@Module({
  providers: [
    {
      provide: Connection,
      useClass: process.env.DATABASE === 'mysql' ? MySQLDummy : PostgresDummy,
    },
    {
      provide: MailService,
      useValue: mailInstance,
    },
    {
      provide: Repository,
      useFactory: createNewRepository,
      inject: [Connection],
    },
  ],
  controllers: [ProviderController],
})
export class ProviderModule {}
