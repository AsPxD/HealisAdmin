import React from 'react';
import { FeatureIcons } from '../icons';
import { navItems } from './navItems';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Navigation({ currentPath, onNavigate }: NavigationProps) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <FeatureIcons.Logo className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">MediSync Pro</span>
            </div>
          </div>

          <div className="flex">
            {navItems.map(({ icon: Icon, label, path }) => (
              <button
                key={path}
                onClick={() => onNavigate(path)}
                className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                  currentPath === path
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}