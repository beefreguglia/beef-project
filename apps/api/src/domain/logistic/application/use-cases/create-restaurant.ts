import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { Restaurant } from '../../enterprise/entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurants-repository';

type CreateRestaurantUseCaseRequest = {
  name: string;
  description: string;
  ownerId: string;
};

type CreateRestaurantUseCaseResponse = Either<
  {},
  {
    restaurant: Restaurant;
  }
>;

class CreateRestaurantUseCase {
  constructor(private restaurantRepository: RestaurantsRepository) {}

  async execute({
    name,
    description,
    ownerId,
  }: CreateRestaurantUseCaseRequest): Promise<CreateRestaurantUseCaseResponse> {
    const restaurant = Restaurant.create({
      name,
      description,
      ownerId: new UniqueEntityID(ownerId),
    });

    await this.restaurantRepository.create(restaurant);

    return right({ restaurant });
  }
}

export { CreateRestaurantUseCase };
