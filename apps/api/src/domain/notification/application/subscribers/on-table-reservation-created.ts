import { DomainEvents } from '@/core/events/domain-events';
import { EventHandler } from '@/core/events/event-handler';
import { RestaurantsRepository } from '@/domain/logistic/application/repositories/restaurants-repository';
import { TablesRepository } from '@/domain/logistic/application/repositories/tables-repository';
import { TableReservationCreatedEvent } from '@/domain/logistic/enterprise/events/table-reservation-created-event';

import { SendNotificationUseCase } from '../use-cases/send-notification';

class OnTableReservationCreated implements EventHandler {
  constructor(
    private tablesRepository: TablesRepository,
    private restaurantsRepository: RestaurantsRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewTableReservationNotification.bind(this),
      TableReservationCreatedEvent.name,
    );
  }

  private async sendNewTableReservationNotification({
    tableReservation,
  }: TableReservationCreatedEvent) {
    const table = await this.tablesRepository.findById(
      tableReservation.tableId.toString(),
    );

    if (table) {
      const restaurant = await this.restaurantsRepository.findById(
        table.restaurantId.toString(),
      );

      if (restaurant) {
        await this.sendNotificationUseCase.execute({
          recipientId: restaurant.ownerId.toString(),
          title: `Nova reserva para a mesa ${table.reference} está esperando aprovação!`,
          content: `Olá, uma nova reserva foi feita para a mesa $${table.reference} no restaurante ${restaurant.name}, esta reserva expirará em ${tableReservation.expiresIn}`,
        });
      }
    }
  }
}

export { OnTableReservationCreated };
