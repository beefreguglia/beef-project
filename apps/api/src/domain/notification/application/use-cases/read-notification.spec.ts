import { makeNotification } from 'test/factories/make-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';

import { NotAllowedError } from '@/domain/logistic/application/use-cases/errors/not-allowed-error';

import { ReadNotificationUseCase } from './read-notification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe('Read a notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const createdNotification = makeNotification();

    inMemoryNotificationsRepository.create(createdNotification);

    const result = await sut.execute({
      notificationId: createdNotification.id.toString(),
      recipientId: createdNotification.recipientId.toString(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
        expect.any(Date),
      );
    }
  });

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification();

    await inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'different-recipient-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
