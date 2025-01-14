import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

type ReservationProps = {
  clientId: UniqueEntityID;
  tableId: UniqueEntityID;
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

  set clientId(clientId: UniqueEntityID) {
    this.props.clientId = clientId;
    this.touch();
  }

  set tableId(tableId: UniqueEntityID) {
    this.props.tableId = tableId;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<ReservationProps, 'createdAt' | 'expiresIn'>,
    id?: UniqueEntityID,
  ) {
    const reservation = new Reservation(
      {
        ...props,
        createdAt: new Date(),
        expiresIn: new Date(),
      },
      id,
    );

    return reservation;
  }
}

export { Reservation };
