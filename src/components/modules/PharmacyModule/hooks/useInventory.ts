import { useState, useEffect } from 'react';
import { InventoryItem, InventoryFilters } from '../types';

const initialFilters: InventoryFilters = {
  search: '',
  category: 'all',
  stockStatus: 'all',
};

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<InventoryFilters>(initialFilters);

  useEffect(() => {
    // Simulate API call
    const fetchInventory = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setInventory([
        {
          id: '1',
          name: 'Aspirin 100mg',
          category: 'Pain Relief',
          stock: 150,
          minStock: 50,
          price: 9.99,
          expiryDate: '2024-12-31',
        },
        // Add more mock items...
      ]);
      setIsLoading(false);
    };

    fetchInventory();
  }, [filters]);

  return { inventory, isLoading, filters, setFilters };
}