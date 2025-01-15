import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Table, TableProps } from '@/domain/logistic/enterprise/entities/table';
export function makeTable(
  override: Partial<TableProps> = {},
  id?: UniqueEntityId,
) {
  const table = Table.create(
    {
      capacity: faker.number.int(),
      reference: faker.color.human(),
      restaurantId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return table;
}
