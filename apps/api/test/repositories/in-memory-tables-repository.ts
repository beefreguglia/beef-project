import { TablesRepository } from '@/domain/logistic/application/repositories/tables-repository';
import { Table } from '@/domain/logistic/enterprise/entities/table';

export class InMemoryTablesRepository implements TablesRepository {
  public items: Table[] = [];

  constructor() {}

  async create(table: Table): Promise<void> {
    this.items.push(table);
  }
}
