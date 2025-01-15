import { InMemoryTablesRepository } from 'test/repositories/in-memory-tables-repository';

import { CreateTableUseCase } from './create-table';

let inMemoryTablesRepository: InMemoryTablesRepository;
let sut: CreateTableUseCase;

describe('Create Table', () => {
  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new CreateTableUseCase(inMemoryTablesRepository);
  });

  it('should be able to create a table', async () => {
    const result = await sut.execute({
      capacity: 4,
      reference: 'A1',
      restaurantId: '1',
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryTablesRepository.items[0]).toEqual(result.value.table);
    }
  });
});
