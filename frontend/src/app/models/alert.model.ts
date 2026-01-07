export interface Alert {
  id: number;
  severity: 'CRITICAL' | 'MODERATE' | 'INFO';
  message: string;
  active: boolean;
  supplier: {
    id: number;
    name: string;
  };
}
