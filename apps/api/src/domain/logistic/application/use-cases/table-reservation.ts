import { Either, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Reservation } from '../../enterprise/entities/reservation';
import { ReservationsRepository } from '../repositories/reservations-repository';

type TableReservationUseCaseRequest = {
  tableId: string;
  clientId: string;
  expiresIn: Date;
  date: Date;
};

type TableReservationUseCaseResponse = Either<
  {},
  {
    reservation: Reservation;
  }
>;

class TableReservationUseCase {
  constructor(private reservationsRepository: ReservationsRepository) {}

  async execute({
    clientId,
    tableId,
    date,
    expiresIn,
  }: TableReservationUseCaseRequest): Promise<TableReservationUseCaseResponse> {
    const reservation = Reservation.create({
      clientId: new UniqueEntityId(clientId),
      tableId: new UniqueEntityId(tableId),
      expiresIn,
      date,
    });

    await this.reservationsRepository.create(reservation);

    return right({ reservation });
  }
}

export { TableReservationUseCase };
