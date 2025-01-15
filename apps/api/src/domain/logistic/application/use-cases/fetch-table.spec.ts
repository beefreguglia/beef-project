import { makeTable } from 'test/factories/make-table';
import { InMemoryTablesRepository } from 'test/repositories/in-memory-tables-repository';

import { FetchTablesUseCase } from './fetch-tables';

let inMemoryTablesRepository: InMemoryTablesRepository;
let sut: FetchTablesUseCase;

describe('Fetch Tables', () => {
  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new FetchTablesUseCase(inMemoryTablesRepository);
  });

  it('should be able to fetch  tables', async () => {
    await inMemoryTablesRepository.create(
      makeTable({ createdAt: new Date(2022, 0, 20) }),
    );
    await inMemoryTablesRepository.create(
      makeTable({ createdAt: new Date(2022, 0, 18) }),
    );
    await inMemoryTablesRepository.create(
      makeTable({ createdAt: new Date(2022, 0, 23) }),
    );

    const result = await sut.execute({
      page: 1,
    });

    expect(result.value?.tables).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it('should be able to fetch paginated  tables', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryTablesRepository.create(makeTable());
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.value?.tables).toHaveLength(2);
  });
});
