import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CookieModule } from './cookie/cookie.module';
import { HttpLearnModule } from './http-learn/http-learn.module';

@Module({
  imports: [CookieModule, HttpLearnModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
