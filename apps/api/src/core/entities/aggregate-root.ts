import { DomainEvent } from '../events/domain-event';
import { DomainEvents } from '../events/domain-events';
import { Entity } from './entity';

abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents() {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}

export { AggregateRoot };
