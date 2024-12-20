import { useState, useEffect } from 'react';
import { Bill } from '../types/billing';

export function useBillingHistory() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setBills([
          {
            billNumber: 'BILL-001',
            customerInfo: {
              name: 'John Doe',
              phone: '+1234567890',
              email: 'john@example.com'
            },
            items: [
              { id: '1', name: 'Aspirin', quantity: 2, price: 9.99 }
            ],
            subtotal: 19.98,
            tax: 2.00,
            total: 21.98,
            status: 'paid',
            paymentMethod: 'card',
            date: new Date().toISOString()
          },
          // Add more mock bills...
        ]);
      } catch (error) {
        console.error('Error fetching bills:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBills();
  }, []);

  return { bills, isLoading };
}