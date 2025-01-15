import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

import { Slug } from './value-objects/slug';

type RestaurantProps = {
  ownerId: UniqueEntityId;
  name: string;
  description: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
};

class Restaurant extends Entity<RestaurantProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get slug() {
    return this.props.slug;
  }

  get ownerId() {
    return this.props.ownerId;
  }

  set name(name: string) {
    this.props.name = name;
    this.props.slug = Slug.createFromText(name);
    this.touch();
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  set ownerId(ownerId: UniqueEntityId) {
    this.props.ownerId = ownerId;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<RestaurantProps, 'slug' | 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const restaurant = new Restaurant(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        slug: props.slug ?? Slug.createFromText(props.name),
      },
      id,
    );

    return restaurant;
  }
}

export { Restaurant };
