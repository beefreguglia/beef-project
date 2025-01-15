import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  TableReservation,
  TableReservationProps,
} from '@/domain/logistic/enterprise/entities/table-reservation';

/**
 * Factory method to create a mock TableReservation
 * @param override - Partial properties to override in the created TableReservation
 * @param id - Optional ID for the TableReservation
 */
export function makeTableReservation(
  override: Partial<TableReservationProps> = {},
  id?: UniqueEntityId,
) {
  const tableReservation = TableReservation.create(
    {
      clientId: new UniqueEntityId(),
      tableId: new UniqueEntityId(),
      date: faker.date.soon(),
      ...override,
    },
    id,
  );

  return tableReservation;
}
