import { Injectable } from '@nestjs/common';

export class Connection {
  getName(): string {
    return ' ';
  }
}

@Injectable()
export class MySQLDummy extends Connection {
  getName(): string {
    return 'MySQLDummy connected!';
  }
}

@Injectable()
export class PostgresDummy extends Connection {
  getName(): string {
    return 'PostgresDummy connected!';
  }
}
