import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export type TableProps = {
  restaurantId: UniqueEntityId;
  reference: string;
  capacity: number;
  createdAt: Date;
  updatedAt?: Date;
};

class Table extends Entity<TableProps> {
  get reference() {
    return this.props.reference;
  }

  get capacity() {
    return this.props.capacity;
  }

  get restaurantId() {
    return this.props.restaurantId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set reference(reference: string) {
    this.props.reference = reference;
    this.touch();
  }

  set capacity(capacity: number) {
    this.props.capacity = capacity;
    this.touch();
  }

  set restaurantId(restaurantId: UniqueEntityId) {
    this.props.restaurantId = restaurantId;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<TableProps, 'createdAt'>, id?: UniqueEntityId) {
    const reservation = new Table(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return reservation;
  }
}

export { Table };
