import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpLearnService {
  sayHello(name: string, id: number): string {
    return `Hello ${name} with ID ${id}`;
  }

  profile(): Record<string, any> {
    return {
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    };
  }
}
