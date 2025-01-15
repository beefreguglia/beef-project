import { Either, left, right } from '@/core/either';

import { TablesRepository } from '../repositories/tables-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type DeleteTableUseCaseRequest = {
  tableId: string;
};

type DeleteTableUseCaseResponse = Either<ResourceNotFoundError, {}>;

class DeleteTableUseCase {
  constructor(private tableRepository: TablesRepository) {}

  async execute({
    tableId,
  }: DeleteTableUseCaseRequest): Promise<DeleteTableUseCaseResponse> {
    const table = await this.tableRepository.findById(tableId);

    if (!table) {
      return left(new ResourceNotFoundError());
    }

    await this.tableRepository.delete(table);

    return right({});
  }
}

export { DeleteTableUseCase };
