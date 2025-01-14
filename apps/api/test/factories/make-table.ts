import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Table } from '@/domain/logistic/enterprise/entities/table';

export function makeTable() {
  const table = Table.create({
    capacity: 1,
    reference: 'reference',
    restaurantId: new UniqueEntityID(),
  });

  return table;
}
