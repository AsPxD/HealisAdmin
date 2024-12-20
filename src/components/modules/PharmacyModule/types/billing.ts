export interface BillItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
}

export type PaymentMethod = 'cash' | 'card' | 'upi' | 'insurance';

export type BillStatus = 'paid' | 'pending' | 'cancelled';

export interface Bill {
  billNumber: string;
  customerInfo: CustomerInfo;
  items: BillItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: BillStatus;
  paymentMethod: PaymentMethod;
  date: string;
}