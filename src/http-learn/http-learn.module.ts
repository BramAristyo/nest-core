import { Module } from '@nestjs/common';
import { HttpLearnController } from './http-learn.controller';

@Module({
  controllers: [HttpLearnController],
})
export class HttpLearnModule {}
