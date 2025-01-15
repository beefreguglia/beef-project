import { Either, left, right } from '@/core/either';

import { Table } from '../../enterprise/entities/table';
import { TablesRepository } from '../repositories/tables-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type EditTableUseCaseRequest = {
  tableId: string;
  capacity: number;
  reference: string;
};

type EditTableUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    table: Table;
  }
>;

class EditTableUseCase {
  constructor(private tableRepository: TablesRepository) {}

  async execute({
    tableId,
    capacity,
    reference,
  }: EditTableUseCaseRequest): Promise<EditTableUseCaseResponse> {
    const table = await this.tableRepository.findById(tableId);

    if (!table) {
      return left(new ResourceNotFoundError());
    }

    table.capacity = capacity;
    table.reference = reference;

    await this.tableRepository.save(table);

    return right({ table });
  }
}

export { EditTableUseCase };
