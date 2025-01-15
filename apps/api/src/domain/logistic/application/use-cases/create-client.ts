import { Either, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Client } from '../../enterprise/entities/client';
import { ClientsRepository } from '../repositories/clients-repository';

type CreateClientUseCaseRequest = {
  name: string;
  restaurantId: string;
};

type CreateClientUseCaseResponse = Either<
  {},
  {
    client: Client;
  }
>;

class CreateClientUseCase {
  constructor(private clientRepository: ClientsRepository) {}

  async execute({
    name,
    restaurantId,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const client = Client.create({
      name,
      restaurantId: new UniqueEntityId(restaurantId),
    });

    await this.clientRepository.create(client);

    return right({ client });
  }
}

export { CreateClientUseCase };
