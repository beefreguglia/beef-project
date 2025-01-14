import { TablesRepository } from '@/domain/logistic/application/repositories/tables-repository';
import { Table } from '@/domain/logistic/enterprise/entities/table';

export class InMemoryTablesRepository implements TablesRepository {
  public items: Table[] = [];

  constructor() {}

  async create(table: Table): Promise<void> {
    this.items.push(table);
  }

  async findById(id: string): Promise<Table | null> {
    const table = this.items.find((item) => item.id.toString() === id);

    if (!table) {
      return null;
    }

    return table;
  }

  async delete(table: Table): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === table.id);

    this.items.splice(itemIndex, 1);
  }

  async save(table: Table): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === table.id);

    this.items[itemIndex] = table;
  }
}
