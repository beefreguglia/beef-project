import { Table } from '../../enterprise/entities/table';
import { TablesRepository } from '../repositories/tables-repository';

type EditTableUseCaseRequest = {
  tableId: string;
  capacity: number;
  reference: string;
};

type EditTableUseCaseResponse = {
  table: Table;
};

class EditTableUseCase {
  constructor(private tableRepository: TablesRepository) {}

  async execute({
    tableId,
    capacity,
    reference,
  }: EditTableUseCaseRequest): Promise<EditTableUseCaseResponse> {
    const table = await this.tableRepository.findById(tableId);
    if (!table) {
      throw new Error('Table not found.');
    }

    table.capacity = capacity;
    table.reference = reference;

    await this.tableRepository.save(table);

    return { table };
  }
}

export { EditTableUseCase };
