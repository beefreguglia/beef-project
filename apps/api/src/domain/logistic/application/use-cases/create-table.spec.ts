import { InMemoryTablesRepository } from 'test/repositories/in-memory-tables-repository';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { CreateTableUseCase } from './create-table';

let inMemoryTablesRepository: InMemoryTablesRepository;
let sut: CreateTableUseCase;

describe('Create Table', () => {
  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new CreateTableUseCase(inMemoryTablesRepository);
  });

  it('should be able to create a table', async () => {
    const { table } = await sut.execute({
      capacity: 4,
      reference: 'A1',
      restaurantId: '1',
    });

    expect(table).toEqual(
      expect.objectContaining({
        capacity: 4,
        reference: 'A1',
        restaurantId: expect.any(UniqueEntityID),
      }),
    );

    expect(inMemoryTablesRepository.items[0].id).toEqual(table.id);
  });
});
