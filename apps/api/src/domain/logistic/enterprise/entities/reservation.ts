import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

type ReservationProps = {
  clientId: UniqueEntityId;
  tableId: UniqueEntityId;
  date: Date;
  expiresIn: Date;
  createdAt: Date;
  updatedAt?: Date;
};

class Reservation extends Entity<ReservationProps> {
  get date() {
    return this.props.date;
  }

  get expiresIn() {
    return this.props.expiresIn;
  }

  get clientId() {
    return this.props.clientId;
  }

  get tableId() {
    return this.props.tableId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set date(date: Date) {
    this.props.date = date;
    this.touch();
  }

  set expiresIn(expiresIn: Date) {
    this.props.date = expiresIn;
    this.touch();
  }

  set clientId(clientId: UniqueEntityId) {
    this.props.clientId = clientId;
    this.touch();
  }

  set tableId(tableId: UniqueEntityId) {
    this.props.tableId = tableId;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<ReservationProps, 'createdAt' | 'expiresIn'>,
    id?: UniqueEntityId,
  ) {
    const reservation = new Reservation(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        expiresIn: props.expiresIn ?? new Date(),
      },
      id,
    );

    return reservation;
  }
}

export { Reservation };
