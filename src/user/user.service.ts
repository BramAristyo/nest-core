import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}
  save(data: CreateUserDto) {
    const exist = this.repository.findByEmail(data.email);
    if (exist != null) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }

    return this.repository.save(data.email, data.name);
  }

  findAll() {
    return this.repository.findAll();
  }
}
