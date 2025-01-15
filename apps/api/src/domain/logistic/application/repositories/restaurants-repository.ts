import { Restaurant } from '../../enterprise/entities/restaurant';

export interface RestaurantsRepository {
  create(restaurant: Restaurant): Promise<void>;
  findById(restaurantId: string): Promise<Restaurant | null>;
}
