import { RestaurantsRepository } from '@/domain/logistic/application/repositories/restaurants-repository';
import { Restaurant } from '@/domain/logistic/enterprise/entities/restaurant';

export class InMemoryRestaurantsRepository implements RestaurantsRepository {
  public items: Restaurant[] = [];

  constructor() {}

  async create(restaurant: Restaurant): Promise<void> {
    this.items.push(restaurant);
  }

  async findById(id: string): Promise<Restaurant | null> {
    const restaurant = this.items.find((item) => item.id.toString() === id);

    if (!restaurant) {
      return null;
    }

    return restaurant;
  }
}
