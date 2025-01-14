import { ReservationsRepository } from '@/domain/logistic/application/repositories/reservations-repository';
import { Reservation } from '@/domain/logistic/enterprise/entities/reservation';

export class InMemoryReservationsRepository implements ReservationsRepository {
  public items: Reservation[] = [];

  constructor() {}

  async create(reservation: Reservation): Promise<void> {
    this.items.push(reservation);
  }
}
