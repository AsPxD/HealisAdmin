import { useState } from 'react';
import { BillItem, Bill } from '../types/billing';

export function useBilling() {
  const [items, setItems] = useState<BillItem[]>([]);

  const addItem = () => {
    setItems([...items, { id: '', quantity: 1, name: '', price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, updatedItem: BillItem) => {
    setItems(items.map((item, i) => i === index ? updatedItem : item));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const generateBill = async (billData: Omit<Bill, 'billNumber' | 'status' | 'date'>) => {
    // In a real app, this would make an API call to save the bill
    console.log('Generating bill:', billData);
    // Reset form after successful submission
    setItems([]);
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    generateBill,
  };
}