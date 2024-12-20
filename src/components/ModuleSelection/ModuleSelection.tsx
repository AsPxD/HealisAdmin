import React from 'react';
import { navItems } from '../Navigation/navItems';

interface ModuleSelectionProps {
  onSelect: (path: string) => void;
}

export function ModuleSelection({ onSelect }: ModuleSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MediSync Pro
          </h1>
          <p className="text-xl text-gray-600">
            Select a module to get started
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {navItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => onSelect(path)}
              className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-500 group"
            >
              <Icon className="w-16 h-16 text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{label}</h2>
              <p className="text-gray-600 text-center">
                {getModuleDescription(path)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function getModuleDescription(path: string): string {
  switch (path) {
    case '/doctors':
      return 'Manage consultations, prescriptions, and patient records';
    case '/lab':
      return 'Handle lab reports, test recommendations, and results';
    case '/pharmacy':
      return 'Process prescriptions and manage medicine inventory';
    case '/admin':
      return 'Oversee system settings and user management';
    default:
      return '';
  }
}