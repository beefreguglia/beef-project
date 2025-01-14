import { ClientsRepository } from '@/domain/logistic/application/repositories/clients-repository';
import { Client } from '@/domain/logistic/enterprise/entities/client';

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = [];

  constructor() {}

  async create(client: Client): Promise<void> {
    this.items.push(client);
  }
}
