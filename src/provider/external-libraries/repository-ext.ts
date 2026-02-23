import { Connection } from './connection-ext';

export class Repository {
  connection: Connection;

  save() {
    return `Save data with connection ${this.connection.getName()}`;
  }
}
