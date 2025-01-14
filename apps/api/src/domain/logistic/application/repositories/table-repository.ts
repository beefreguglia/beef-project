import { Table } from '../../enterprise/entities/table';

export interface TableRepository {
  create(table: Table): Promise<void>;
}
