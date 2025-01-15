import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository';

import { CreateClientUseCase } from './create-client';

let inMemoryClientsRepository: InMemoryClientsRepository;
let sut: CreateClientUseCase;

describe('Create Client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository();
    sut = new CreateClientUseCase(inMemoryClientsRepository);
  });

  it('should be able to create a client', async () => {
    const result = await sut.execute({
      name: 'Client name',
      restaurantId: '1',
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryClientsRepository.items[0]).toEqual(result.value?.client);
    }
  });
});
