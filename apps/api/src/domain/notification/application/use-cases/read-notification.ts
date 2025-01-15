import { Either, left, right } from '@/core/either';
import { NotAllowedError } from '@/domain/logistic/application/use-cases/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/domain/logistic/application/use-cases/errors/resource-not-found-error';

import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

type ReadNotificationUseCaseRequest = {
  recipientId: string;
  notificationId: string;
};

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>;

class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationRepository.save(notification);

    return right({ notification });
  }
}

export { ReadNotificationUseCase };
