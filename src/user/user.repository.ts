import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserRepository {
  constructor(private databaseService: DatabaseService) {}
  async save(email: string, name: string) {
    await this.databaseService.user.create({
      data: {
        email: email,
        name: name,
      },
    });

    return `Successfully created ${email} user!`;
  }
}
