import { Either, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { Table } from '../../enterprise/entities/table';
import { TablesRepository } from '../repositories/tables-repository';

type CreateTableUseCaseRequest = {
  restaurantId: string;
  reference: string;
  capacity: number;
};

type CreateTableUseCaseResponse = Either<
  null,
  {
    table: Table;
  }
>;

class CreateTableUseCase {
  constructor(private tableRepository: TablesRepository) {}

  async execute({
    capacity,
    reference,
    restaurantId,
  }: CreateTableUseCaseRequest): Promise<CreateTableUseCaseResponse> {
    const table = Table.create({
      capacity,
      reference,
      restaurantId: new UniqueEntityId(restaurantId),
    });

    await this.tableRepository.create(table);

    return right({ table });
  }
}

export { CreateTableUseCase };
