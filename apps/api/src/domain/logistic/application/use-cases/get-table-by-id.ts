import { Table } from '../../enterprise/entities/table';
import { TablesRepository } from '../repositories/tables-repository';

type GetTableByIdUseCaseRequest = {
  tableId: string;
};

type GetTableByIdUseCaseResponse = {
  table: Table;
};

class GetTableByIdUseCase {
  constructor(private tablesRepository: TablesRepository) {}

  async execute({
    tableId,
  }: GetTableByIdUseCaseRequest): Promise<GetTableByIdUseCaseResponse> {
    const table = await this.tablesRepository.findById(tableId);

    if (!table) {
      throw new Error('Table not found');
    }

    return { table };
  }
}

export { GetTableByIdUseCase };
