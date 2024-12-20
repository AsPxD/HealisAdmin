import { useState, useEffect } from 'react';

interface InventoryStats {
  pendingOrders: number;
  totalItems: number;
  lowStockItems: number;
}

export function useInventoryStats() {
  const [stats, setStats] = useState<InventoryStats>({
    pendingOrders: 15,
    totalItems: 1234,
    lowStockItems: 23,
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    const interval = setInterval(() => {
      setStats(current => ({
        ...current,
        pendingOrders: current.pendingOrders + Math.floor(Math.random() * 3),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { stats };
}