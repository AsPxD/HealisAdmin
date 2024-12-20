import React from 'react';
import { Search, Filter } from 'lucide-react';
import { UserFilters as IUserFilters } from '../../types';

interface UserFiltersProps {
  filters: IUserFilters;
  onFilterChange: (filters: IUserFilters) => void;
}

export function UserFilters({ filters, onFilterChange }: UserFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex-1 min-w-[200px] relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        />
      </div>

      <select
        value={filters.role}
        onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="doctor">Doctor</option>
        <option value="lab">Lab Technician</option>
        <option value="pharmacy">Pharmacist</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </select>

      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
        <Filter className="w-5 h-5" />
      </button>
    </div>
  );
}