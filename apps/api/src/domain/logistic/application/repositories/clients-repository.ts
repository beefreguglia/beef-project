import { Client } from '../../enterprise/entities/client';

export interface ClientsRepository {
  create(client: Client): Promise<void>;
}
