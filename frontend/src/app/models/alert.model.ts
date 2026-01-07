import { Supplier } from './supplier.model';

export interface Alert {
  id: number;
  severity: 'CRITICAL' | 'MODERATE' | 'INFO';
  message: string;
  active: boolean;
  supplier: Supplier;
}
