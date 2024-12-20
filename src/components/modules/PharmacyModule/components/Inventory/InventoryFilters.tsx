import React from 'react';
import { InventoryFilters as IInventoryFilters } from '../../types';

interface InventoryFiltersProps {
  filters: IInventoryFilters;
  onFilterChange: (filters: IInventoryFilters) => void;
}

export function InventoryFilters({ filters, onFilterChange }: InventoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          placeholder="Search inventory..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <select
        value={filters.category}
        onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="all">All Categories</option>
        <option value="painRelief">Pain Relief</option>
        <option value="antibiotics">Antibiotics</option>
        <option value="cardio">Cardiovascular</option>
      </select>

      <select
        value={filters.stockStatus}
        onChange={(e) => onFilterChange({ ...filters, stockStatus: e.target.value as IInventoryFilters['stockStatus'] })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="all">All Stock Status</option>
        <option value="low">Low Stock</option>
        <option value="normal">Normal Stock</option>
        <option value="overstock">Overstock</option>
      </select>
    </div>
  );
}