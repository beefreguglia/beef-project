import { TablesRepository } from '../repositories/tables-repository';

type DeleteTableUseCaseRequest = {
  tableId: string;
};

// type DeleteTableUseCaseResponse = {};

class DeleteTableUseCase {
  constructor(private tableRepository: TablesRepository) {}

  async execute({ tableId }: DeleteTableUseCaseRequest) {
    const table = await this.tableRepository.findById(tableId);

    if (!table) {
      throw new Error('Table not found');
    }

    await this.tableRepository.delete(table);

    return {};
  }
}

export { DeleteTableUseCase };
