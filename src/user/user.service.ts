import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}
  save(data: CreateUserDto) {
    return this.repository.save(data.email, data.name);
  }
}
