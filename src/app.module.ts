import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CookieModule } from './cookie/cookie.module';
import { HttpLearnModule } from './http-learn/http-learn.module';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from './provider/provider.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import { ValidationModule } from './validation/validation.module';
import * as winston from 'winston';
import { LogMiddleware } from './log/log.middleware';

@Module({
  imports: [
    ValidationModule.forRoot(true),
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [new winston.transports.Console()],
    }),
    CookieModule,
    HttpLearnModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProviderModule,
    DatabaseModule,
    UserModule,
    ValidationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
