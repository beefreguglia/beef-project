import { Either, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

type SendNotificationUseCaseRequest = {
  recipientId: string;
  title: string;
  content: string;
};

type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      title,
      content,
      recipientId: new UniqueEntityId(recipientId),
    });

    await this.notificationRepository.create(notification);

    return right({ notification });
  }
}

export { SendNotificationUseCase };
