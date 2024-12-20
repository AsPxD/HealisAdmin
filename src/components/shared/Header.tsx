import React from 'react';
import { LogOut } from 'lucide-react';
import { UserRole } from '../../App';

interface HeaderProps {
  user: {
    name: string;
    role: UserRole;
  };
  onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'doctor':
        return 'Medical Professional';
      case 'lab':
        return 'Lab Technician';
      case 'pharmacy':
        return 'Pharmacist';
      case 'admin':
        return 'Administrator';
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              {user.name}
            </h1>
            <span className="ml-2 px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
              {getRoleLabel(user.role)}
            </span>
          </div>
          
          <button
            onClick={onLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}