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
    const result = await sut.execute({
      name: 'Restaurant name',
      description: 'Description',
      ownerId: '1',
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryRestaurantsRepository.items[0]).toEqual(
        result.value.restaurant,
      );
    }
  });
});
