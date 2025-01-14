import { Table } from '../../enterprise/entities/table';

export interface TablesRepository {
  create(table: Table): Promise<void>;
  findById(id: string): Promise<Table | null>;
  delete(table: Table): Promise<void>;
  save(table: Table): Promise<void>;
}
