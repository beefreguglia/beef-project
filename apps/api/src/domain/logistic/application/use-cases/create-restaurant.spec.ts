import { InMemoryRestaurantsRepository } from 'test/repositories/in-memory-restaurants-repository';

import { CreateRestaurantUseCase } from './create-restaurant';

let inMemoryRestaurantsRepository: InMemoryRestaurantsRepository;
let sut: CreateRestaurantUseCase;

describe('Create Restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantsRepository = new InMemoryRestaurantsRepository();
    sut = new CreateRestaurantUseCase(inMemoryRestaurantsRepository);
  });

  it('should be able to create a restaurant', async () => {
    const { restaurant } = await sut.execute({
      name: 'Restaurant name',
      description: 'Description',
      ownerId: '1',
    });

    expect(restaurant).toEqual(
      expect.objectContaining({
        name: 'Restaurant name',
        description: 'Description',
        ownerId: restaurant.ownerId,
      }),
    );

    expect(inMemoryRestaurantsRepository.items[0].id).toEqual(restaurant.id);
  });
});
