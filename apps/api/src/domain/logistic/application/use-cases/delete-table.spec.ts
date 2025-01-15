import { makeTable } from 'test/factories/make-table';
import { InMemoryTablesRepository } from 'test/repositories/in-memory-tables-repository';

import { DeleteTableUseCase } from './delete-table';

let inMemoryTablesRepository: InMemoryTablesRepository;
let sut: DeleteTableUseCase;

describe('Delete Table', () => {
  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new DeleteTableUseCase(inMemoryTablesRepository);
  });

  it('should be able to delete a table', async () => {
    const table = makeTable();

    await inMemoryTablesRepository.create(table);

    const result = await sut.execute({
      tableId: table.id.toString(),
    });

    expect(inMemoryTablesRepository.items).toHaveLength(0);
    expect(result.isRight()).toBe(true);
  });
});
