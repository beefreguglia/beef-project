import { Table } from '../../enterprise/entities/table';

export interface TablesRepository {
  create(table: Table): Promise<void>;
}
