import { Table } from '../../enterprise/entities/table';

export interface TablesRepository {
  create(table: Table): Promise<void>;
  findById(id: string): Promise<Table | null>;
}
