import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

type TableProps = {
  restaurantId: UniqueEntityID;
  reference: string;
  capacity: number;
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

  set reference(reference: string) {
    this.props.reference = reference;
  }

  set capacity(capacity: number) {
    this.props.capacity = capacity;
  }

  set restaurantId(restaurantId: UniqueEntityID) {
    this.props.restaurantId = restaurantId;
  }

  static create(props: TableProps, id?: UniqueEntityID) {
    const reservation = new Table(props, id);

    return reservation;
  }
}

export { Table };
