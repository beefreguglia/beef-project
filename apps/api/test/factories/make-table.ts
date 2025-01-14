import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Table, TableProps } from '@/domain/logistic/enterprise/entities/table';
export function makeTable(
  override: Partial<TableProps> = {},
  id?: UniqueEntityID,
) {
  const table = Table.create(
    {
      capacity: faker.number.int(),
      reference: faker.color.human(),
      restaurantId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return table;
}
