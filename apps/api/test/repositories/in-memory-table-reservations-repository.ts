import { DomainEvents } from '@/core/events/domain-events';
import { TableReservationsRepository } from '@/domain/logistic/application/repositories/table-reservations-repository';
import { TableReservation } from '@/domain/logistic/enterprise/entities/table-reservation';

export class InMemoryTableReservationsRepository
  implements TableReservationsRepository
{
  public items: TableReservation[] = [];

  constructor() {}

  async create(tableReservation: TableReservation): Promise<void> {
    this.items.push(tableReservation);

    DomainEvents.dispatchEventsForAggregate(tableReservation.id);
  }
}
