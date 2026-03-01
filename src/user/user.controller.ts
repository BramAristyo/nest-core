import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post()
  save(@Body() data: CreateUserDto) {
    return this.service.save(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
