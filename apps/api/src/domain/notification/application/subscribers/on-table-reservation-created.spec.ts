import { makeRestaurant } from 'test/factories/make-restaurant';
import { makeTable } from 'test/factories/make-table';
import { makeTableReservation } from 'test/factories/make-table-reservation';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { InMemoryRestaurantsRepository } from 'test/repositories/in-memory-restaurants-repository';
import { InMemoryTableReservationsRepository } from 'test/repositories/in-memory-table-reservations-repository';
import { InMemoryTablesRepository } from 'test/repositories/in-memory-tables-repository';
import { waitFor } from 'test/utils/wait-for';
import { MockInstance } from 'vitest';

import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification';
import { OnTableReservationCreated } from './on-table-reservation-created';

let inMemoryTablesRepository: InMemoryTablesRepository;
let inMemoryRestaurantsRepository: InMemoryRestaurantsRepository;
let inMemoryTableReservationsRepository: InMemoryTableReservationsRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest,
  ) => Promise<SendNotificationUseCaseResponse>
>;

describe('On table reservation created', () => {
  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    inMemoryRestaurantsRepository = new InMemoryRestaurantsRepository();
    inMemoryTableReservationsRepository =
      new InMemoryTableReservationsRepository();
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

    new OnTableReservationCreated(
      inMemoryTablesRepository,
      inMemoryRestaurantsRepository,
      sendNotificationUseCase,
    );
  });

  it('should send a notification when an answer is created', async () => {
    const restaurant = makeRestaurant();
    await inMemoryRestaurantsRepository.create(restaurant);

    const table = makeTable({ restaurantId: restaurant.id });
    await inMemoryTablesRepository.create(table);

    const tableReservation = makeTableReservation({ tableId: table.id });
    await inMemoryTableReservationsRepository.create(tableReservation);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
