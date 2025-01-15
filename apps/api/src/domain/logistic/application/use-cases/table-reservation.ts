import { Either, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { TableReservation } from '../../enterprise/entities/table-reservation';
import { TableReservationsRepository } from '../repositories/table-reservations-repository';

type TableReservationUseCaseRequest = {
  tableId: string;
  clientId: string;
  expiresIn: Date;
  date: Date;
};

type TableReservationUseCaseResponse = Either<
  null,
  {
    tableReservation: TableReservation;
  }
>;

class TableReservationUseCase {
  constructor(
    private tableReservationsRepository: TableReservationsRepository,
  ) {}

  async execute({
    clientId,
    tableId,
    date,
    expiresIn,
  }: TableReservationUseCaseRequest): Promise<TableReservationUseCaseResponse> {
    const tableReservation = TableReservation.create({
      clientId: new UniqueEntityId(clientId),
      tableId: new UniqueEntityId(tableId),
      expiresIn,
      date,
    });

    await this.tableReservationsRepository.create(tableReservation);

    return right({ tableReservation });
  }
}

export { TableReservationUseCase };
