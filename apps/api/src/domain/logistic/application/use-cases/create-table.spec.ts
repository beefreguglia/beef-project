import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { Table } from '../../enterprise/entities/table';
import { TableRepository } from '../repositories/table-repository';
import { CreateTableUseCase } from './create-table';

const fakeTableRepository: TableRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (table: Table) => {
    return;
  },
};

test('create a table', async () => {
  const createTableUseCase = new CreateTableUseCase(fakeTableRepository);

  const { table } = await createTableUseCase.execute({
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
});
