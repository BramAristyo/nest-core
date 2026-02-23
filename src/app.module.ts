import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CookieModule } from './cookie/cookie.module';
import { HttpLearnModule } from './http-learn/http-learn.module';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from './provider/provider.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CookieModule,
    HttpLearnModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProviderModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
