import { Either, right } from '@/core/either';
import { Table } from '@/domain/logistic/enterprise/entities/table';

import { TablesRepository } from '../repositories/tables-repository';

interface FetchTablesUseCaseRequest {
  page: number;
}

type FetchTablesUseCaseResponse = Either<
  null,
  {
    tables: Table[];
  }
>;

export class FetchTablesUseCase {
  constructor(private tablesRepository: TablesRepository) {}

  async execute({
    page,
  }: FetchTablesUseCaseRequest): Promise<FetchTablesUseCaseResponse> {
    const tables = await this.tablesRepository.findMany({ page });

    return right({
      tables,
    });
  }
}
