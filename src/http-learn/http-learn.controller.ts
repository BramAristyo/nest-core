import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiParam, ApiQuery } from '@nestjs/swagger';
import type { Request } from 'express';
import { HttpLearnService } from './http-learn.service';
import { ValidationService } from 'src/validation/validation.service';
import { z } from 'zod';

@Controller('http-learn')
export class HttpLearnController {
  constructor(
    private service: HttpLearnService,
    private validationService: ValidationService,
  ) {}

  @Get()
  get(): string {
    return 'This is GET endpoint';
  }

  @Post()
  post(): string {
    return 'This is POST endpoint';
  }

  @ApiHeader({ name: 'header', description: 'Custom header' })
  @ApiParam({ name: 'id', description: 'User Id' })
  @ApiQuery({ name: 'query', description: 'Search Query' })
  @ApiBody({ schema: { example: { message: 'hello' } } })
  @Header('header', 'header')
  @Post('request/:id')
  request(@Req() req: Request): Record<string, any> {
    return {
      // Type Assertion (TS) is Mandatory
      query: `This is query ${req.query.query as string}`,
      param: `This is param ${req.params.id as string}`,
      header: `This is header ${req.headers.header as string}`,
      body: `This is body ${JSON.stringify(req.body)}`,
    };
  }

  /*
    Asynchronouse function on Nest, await must be Promise type 
    User @Query or @Param for readable code
  */
  @Get('say-hello/:id')
  async sayHello(@Query('name') name: string, @Param('id') id: number) {
    await this.loading(3000);

    const schema = z.string().max(5);
    name = this.validationService.validate(schema, name);
    return this.service.sayHello(name, id);
  }

  private loading = (time: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @Get('profile')
  profile(): Record<string, any> {
    return this.service.profile();
  }

  @Get('docs')
  @Redirect('/api')
  getDocs() {
    return;
  }
}
