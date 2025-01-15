import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';

import { TableReservation } from '../entities/table-reservation';

export class TableReservationCreatedEvent implements DomainEvent {
  public occurredAt: Date;
  public tableReservation: TableReservation;

  constructor(tableReservation: TableReservation) {
    this.tableReservation = tableReservation;
    this.occurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.tableReservation.id;
  }
}
