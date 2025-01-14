import { Reservation } from '../../enterprise/entities/reservation';

export interface ReservationRepository {
  create(reservation: Reservation): Promise<void>;
}
