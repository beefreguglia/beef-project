import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Restaurant,
  RestaurantProps,
} from '@/domain/logistic/enterprise/entities/restaurant';

/**
 * Factory method to create a mock Restaurant
 * @param override - Partial properties to override in the created Restaurant
 * @param id - Optional ID for the Restaurant
 */
export function makeRestaurant(
  override: Partial<RestaurantProps> = {},
  id?: UniqueEntityId,
) {
  const restaurant = Restaurant.create(
    {
      name: faker.company.name(),
      description: faker.company.buzzPhrase(),
      ownerId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return restaurant;
}
