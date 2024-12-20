import React from 'react';
import { Package, Search, Filter } from 'lucide-react';
import { InventoryList } from './InventoryList';
import { InventoryFilters } from './InventoryFilters';
import { useInventory } from '../../hooks/useInventory';

export function InventoryManagement() {
  const { inventory, isLoading, filters, setFilters } = useInventory();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">
            {inventory.length} Items
          </span>
        </div>
      </div>

      <InventoryFilters filters={filters} onFilterChange={setFilters} />
      <InventoryList inventory={inventory} isLoading={isLoading} />
    </div>
  );
}