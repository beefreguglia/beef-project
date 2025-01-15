import { PaginationParams } from '@/core/repositories/pagination-params';

import { Table } from '../../enterprise/entities/table';

export interface TablesRepository {
  create(table: Table): Promise<void>;
  findById(id: string): Promise<Table | null>;
  delete(table: Table): Promise<void>;
  save(table: Table): Promise<void>;
  findMany(params: PaginationParams): Promise<Table[]>;
}
