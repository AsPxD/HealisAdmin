import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Specialization } from '../../types';

interface DoctorFiltersProps {
  specializations: Specialization[];
  selectedSpecialization: string;
  searchQuery: string;
  onSpecializationChange: (specialization: string) => void;
  onSearchChange: (query: string) => void;
}

export function DoctorFilters({
  specializations,
  selectedSpecialization,
  searchQuery,
  onSpecializationChange,
  onSearchChange,
}: DoctorFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={selectedSpecialization}
            onChange={(e) => onSpecializationChange(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}