import { Either, left, right } from '@/core/either';

import { Restaurant } from '../../enterprise/entities/restaurant';
import { RestaurantsRepository } from '../repositories/restaurants-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type GetRestaurantByIdUseCaseRequest = {
  restaurantId: string;
};

type GetRestaurantByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    restaurant: Restaurant;
  }
>;

class GetRestaurantByIdUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    restaurantId,
  }: GetRestaurantByIdUseCaseRequest): Promise<GetRestaurantByIdUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId);

    if (!restaurant) {
      return left(new ResourceNotFoundError());
    }

    return right({ restaurant });
  }
}

export { GetRestaurantByIdUseCase };
