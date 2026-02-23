import { Module } from '@nestjs/common';
import { Mail } from './mail/mail';
import { Connection, PostgresDummy, MySQLDummy } from './connection/connection';
import { ProviderController } from './provider.controller';

@Module({
  providers: [
    {
      provide: Connection,
      useClass: process.env.DATABASE === 'mysql' ? MySQLDummy : PostgresDummy,
    },
    Mail,
  ],
  controllers: [ProviderController],
})
export class ProviderModule {}
