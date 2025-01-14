import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { Reservation } from '../../enterprise/entities/reservation';
import { ReservationRepository } from '../repositories/reservation-repository';

type ReserveTableUseCaseRequest = {
  tableId: string;
  clientId: string;
  expiresIn: Date;
  date: Date;
};

class ReserveTableUseCase {
  constructor(private reservationRepository: ReservationRepository) {}

  async execute({
    clientId,
    tableId,
    date,
    expiresIn,
  }: ReserveTableUseCaseRequest) {
    const reservation = Reservation.create({
      clientId: new UniqueEntityID(clientId),
      tableId: new UniqueEntityID(tableId),
      expiresIn,
      date,
    });

    await this.reservationRepository.create(reservation);

    return reservation;
  }
}

export { ReserveTableUseCase };
