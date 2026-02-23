import { Connection } from '../external-libraries/connection-ext';
import { Repository } from '../external-libraries/repository-ext';

export function createNewRepository(connection: Connection): Repository {
  const repository = new Repository();
  repository.connection = connection;

  return repository;
}
