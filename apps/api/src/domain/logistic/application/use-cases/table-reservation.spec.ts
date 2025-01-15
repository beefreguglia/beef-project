import { InMemoryReservationsRepository } from 'test/repositories/in-memory-reservations-repository';

import { TableReservationUseCase } from './table-reservation';

let inMemoryReservationsRepository: InMemoryReservationsRepository;
let sut: TableReservationUseCase;

describe('Table reservation', () => {
  beforeEach(() => {
    inMemoryReservationsRepository = new InMemoryReservationsRepository();
    sut = new TableReservationUseCase(inMemoryReservationsRepository);
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
      expect(inMemoryReservationsRepository.items[0]).toEqual(
        result.value.reservation,
      );
    }
  });
});
