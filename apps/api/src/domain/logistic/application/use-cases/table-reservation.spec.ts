import { InMemoryTableReservationsRepository } from 'test/repositories/in-memory-table-reservations-repository';

import { TableReservationUseCase } from './table-reservation';

let inMemoryTableReservationsRepository: InMemoryTableReservationsRepository;
let sut: TableReservationUseCase;

describe('Table reservation', () => {
  beforeEach(() => {
    inMemoryTableReservationsRepository =
      new InMemoryTableReservationsRepository();
    sut = new TableReservationUseCase(inMemoryTableReservationsRepository);
  });

  it('should be able to reserve a table', async () => {
    const result = await sut.execute({
      clientId: '1',
      tableId: '1',
      date: new Date(),
      expiresIn: new Date(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryTableReservationsRepository.items[0]).toEqual(
        result.value.tableReservation,
      );
    }
  });
});
