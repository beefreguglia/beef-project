import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

import { Slug } from './value-objects/slug';

type RestaurantProps = {
  ownerId: UniqueEntityID;
  name: string;
  description: string;
  slug: Slug;
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
  }

  set description(description: string) {
    this.props.description = description;
  }

  set ownerId(ownerId: UniqueEntityID) {
    this.props.ownerId = ownerId;
  }

  static create(props: Optional<RestaurantProps, 'slug'>, id?: UniqueEntityID) {
    const restaurant = new Restaurant(
      { ...props, slug: props.slug ?? Slug.createFromText(props.name) },
      id,
    );

    return restaurant;
  }
}

export { Restaurant };
