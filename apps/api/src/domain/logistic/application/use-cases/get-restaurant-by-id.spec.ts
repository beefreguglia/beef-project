import { makeRestaurant } from 'test/factories/make-restaurant';
import { InMemoryRestaurantsRepository } from 'test/repositories/in-memory-restaurants-repository';

import { GetRestaurantByIdUseCase } from './get-restaurant-by-id';

let inMemoryRestaurantsRepository: InMemoryRestaurantsRepository;
let sut: GetRestaurantByIdUseCase;

describe('Get restaurant by id', () => {
  beforeEach(() => {
    inMemoryRestaurantsRepository = new InMemoryRestaurantsRepository();
    sut = new GetRestaurantByIdUseCase(inMemoryRestaurantsRepository);
  });

  it('should be able to get a restaurant by id', async () => {
    const createdRestaurant = makeRestaurant();

    await inMemoryRestaurantsRepository.create(createdRestaurant);

    const result = await sut.execute({
      restaurantId: createdRestaurant.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.restaurant.id).toBeTruthy();
      expect(result.value.restaurant.name).toEqual(createdRestaurant.name);
    }
  });
});
