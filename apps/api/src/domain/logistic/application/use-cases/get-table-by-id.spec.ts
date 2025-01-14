import { makeTable } from 'test/factories/make-table';
import { InMemoryTablesRepository } from 'test/repositories/in-memory-tables-repository';

import { GetTableByIdUseCase } from './get-table-by-id';

let inMemoryTablesRepository: InMemoryTablesRepository;
let sut: GetTableByIdUseCase;

describe('Get table by id', () => {
  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new GetTableByIdUseCase(inMemoryTablesRepository);
  });

  it('should be able to get a table by id', async () => {
    const createdTable = makeTable();

    await inMemoryTablesRepository.create(createdTable);

    const { table } = await sut.execute({
      tableId: createdTable.id.toString(),
    });

    expect(table.id).toBeTruthy();
    expect(table.reference).toEqual(createdTable.reference);
  });
});
