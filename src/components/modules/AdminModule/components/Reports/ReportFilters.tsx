import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ReportFilters as IReportFilters } from '../../types';

interface ReportFiltersProps {
  filters: IReportFilters;
  onFilterChange: (filters: IReportFilters) => void;
}

export function ReportFilters({ filters, onFilterChange }: ReportFiltersProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          placeholder="Search reports..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        />
      </div>
      <select
        value={filters.type}
        onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
      >
        <option value="all">All Types</option>
        <option value="system">System Reports</option>
        <option value="user">User Reports</option>
        <option value="audit">Audit Reports</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
      >
        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
    </div>
  );
}