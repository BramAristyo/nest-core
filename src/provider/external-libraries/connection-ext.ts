export class Connection {
  getName(): string {
    return ' ';
  }
}

export class MySQLDummy extends Connection {
  getName(): string {
    return 'MySQLDummy connected!';
  }
}

export class PostgresDummy extends Connection {
  getName(): string {
    return 'PostgresDummy connected!';
  }
}
