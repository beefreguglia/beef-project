import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

type ClientProps = {
  restaurantId: UniqueEntityId;
  name: string;
  createdAt: Date;
  updatedAt?: Date | null;
};

class Client extends Entity<ClientProps> {
  get name() {
    return this.props.name;
  }

  get restaurantId() {
    return this.props.restaurantId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt ?? null;
  }

  set restaurantId(id: UniqueEntityId) {
    this.restaurantId = id;
    this.touch();
  }

  set name(name: string) {
    this.name = name;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<ClientProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const client = new Client(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return client;
  }
}

export { Client };
