import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { Reservation } from '../../enterprise/entities/reservation';
import { ReservationRepository } from '../repositories/reservation-repository';
import { ReserveTableUseCase } from './table-reservation';

const fakeReservationRepository: ReservationRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (reservation: Reservation) => {
    return;
  },
};

test('create a reservation', async () => {
  const reservationTableUseCase = new ReserveTableUseCase(
    fakeReservationRepository,
  );

  const reservation = await reservationTableUseCase.execute({
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
