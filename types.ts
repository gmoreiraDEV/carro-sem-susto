
export type MaintenanceType = 'Preventiva' | 'Corretiva' | 'Emergencial';

export type MaintenanceCategory = 
  | 'Arrefecimento' 
  | 'Óleo e Filtros' 
  | 'Pneus' 
  | 'Freios' 
  | 'Elétrica' 
  | 'Suspensão' 
  | 'Outro';

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: MaintenanceType;
  category: MaintenanceCategory;
  description: string;
  value: number;
  km: number;
  attachment?: string;
}

export interface Vehicle {
  brand: string;
  model: string;
  year: string;
  currentKm: number;
  fipeValue: number;
  purchaseDate: string;
}

export type ChecklistStatus = 'OK' | 'Atenção' | 'Problema';

export interface ChecklistItem {
  id: string;
  label: string;
  status: ChecklistStatus;
  recommendation: string;
}

export type AppView = 'Dashboard' | 'Vehicle' | 'Maintenance' | 'Checklist' | 'Decision' | 'Education';
