export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  expiryDate: string;
}

export interface InventoryFilters {
  search: string;
  category: string;
  stockStatus: 'all' | 'low' | 'normal' | 'overstock';
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  medications: Medication[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  issuedDate: string;
  completedDate?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface DispensingUnit {
  id: number;
  status: 'active' | 'maintenance' | 'error';
  temperature: number;
  humidity: number;
  lastCalibration: string;
}