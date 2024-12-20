import React from 'react';
import { UserList } from './UserList';
import { UserFilters } from './UserFilters';
import { useUsers } from '../../hooks/useUsers';

export function UserManagement() {
  const { users, isLoading, filters, setFilters } = useUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700">
          Add New User
        </button>
      </div>

      <UserFilters filters={filters} onFilterChange={setFilters} />
      <UserList users={users} isLoading={isLoading} />
    </div>
  );
}