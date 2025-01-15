import { Either, left, right } from '@/core/either';

import { Table } from '../../enterprise/entities/table';
import { TablesRepository } from '../repositories/tables-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type GetTableByIdUseCaseRequest = {
  tableId: string;
};

type GetTableByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    table: Table;
  }
>;

class GetTableByIdUseCase {
  constructor(private tablesRepository: TablesRepository) {}

  async execute({
    tableId,
  }: GetTableByIdUseCaseRequest): Promise<GetTableByIdUseCaseResponse> {
    const table = await this.tablesRepository.findById(tableId);

    if (!table) {
      return left(new ResourceNotFoundError());
    }

    return right({ table });
  }
}

export { GetTableByIdUseCase };
