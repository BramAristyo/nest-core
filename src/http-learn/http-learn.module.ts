import { Module } from '@nestjs/common';
import { HttpLearnController } from './http-learn.controller';
import { HttpLearnService } from './http-learn.service';

@Module({
  controllers: [HttpLearnController],
  providers: [HttpLearnService],
})
export class HttpLearnModule {}
