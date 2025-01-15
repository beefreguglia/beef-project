import { TableReservation } from '../../enterprise/entities/table-reservation';

export interface TableReservationsRepository {
  create(tableReservation: TableReservation): Promise<void>;
}
