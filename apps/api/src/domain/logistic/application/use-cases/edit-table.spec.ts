import { makeTable } from 'test/factories/make-table';
import { InMemoryTablesRepository } from 'test/repositories/in-memory-tables-repository';

import { EditTableUseCase } from './edit-table';

let inMemoryTablesRepository: InMemoryTablesRepository;
let sut: EditTableUseCase;

describe('Edit Table', () => {
  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new EditTableUseCase(inMemoryTablesRepository);
  });

  it('should be able to edit a table', async () => {
    const table = makeTable();

    await inMemoryTablesRepository.create(table);

    await sut.execute({
      tableId: table.id.toString(),
      capacity: 2,
      reference: 'Updated',
    });

    expect(inMemoryTablesRepository.items[0]).toMatchObject({
      capacity: 2,
      reference: 'Updated',
    });
  });
});
