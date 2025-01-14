import { InMemoryReservationsRepository } from 'test/repositories/in-memory-reservations-repository';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { TableReservationUseCase } from './table-reservation';

let inMemoryReservationsRepository: InMemoryReservationsRepository;
let sut: TableReservationUseCase;

describe('Create Table', () => {
  beforeEach(() => {
    inMemoryReservationsRepository = new InMemoryReservationsRepository();
    sut = new TableReservationUseCase(inMemoryReservationsRepository);
  });

  it('should be able to create a table', async () => {
    const reservation = await sut.execute({
      clientId: '1',
      tableId: '1',
      date: new Date(),
      expiresIn: new Date(),
    });

    expect(reservation).toEqual(
      expect.objectContaining({
        clientId: expect.any(UniqueEntityID),
        tableId: expect.any(UniqueEntityID),
        date: expect.any(Date),
        expiresIn: expect.any(Date),
      }),
    );
  });
});
