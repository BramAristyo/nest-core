import { Controller, Query, Get, Res, Req } from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('cookie')
export class CookieController {
  @Get('set')
  setCookie(@Query('token') token: string, @Res() res: Response) {
    res.cookie('token', token);
    res.status(200).send('Success Set Cookies');
  }

  @Get('get')
  getCookie(@Req() req: Request): string {
    return req.cookies['token'] as string;
  }
}
