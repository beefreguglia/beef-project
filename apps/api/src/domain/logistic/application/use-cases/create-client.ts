import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { Client } from '../../enterprise/entities/client';
import { ClientsRepository } from '../repositories/clients-repository';

type CreateClientUseCaseRequest = {
  name: string;
  restaurantId: string;
};

type CreateClientUseCaseResponse = {
  client: Client;
};

class CreateClientUseCase {
  constructor(private clientRepository: ClientsRepository) {}

  async execute({
    name,
    restaurantId,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const client = Client.create({
      name,
      restaurantId: new UniqueEntityID(restaurantId),
    });

    await this.clientRepository.create(client);

    return { client };
  }
}

export { CreateClientUseCase };
