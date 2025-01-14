import { Reservation } from '../../enterprise/entities/reservation';

export interface ReservationsRepository {
  create(reservation: Reservation): Promise<void>;
}
