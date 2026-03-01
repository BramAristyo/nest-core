import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { DatabaseService } from 'src/database/database.service';
import { Logger } from 'winston';

@Injectable()
export class UserRepository {
  constructor(
    private databaseService: DatabaseService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async save(email: string, name: string) {
    await this.databaseService.user.create({
      data: {
        email: email,
        name: name,
      },
    });

    this.logger.info('Create user repository');
    return `Successfully created ${email} user!`;
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }
}
