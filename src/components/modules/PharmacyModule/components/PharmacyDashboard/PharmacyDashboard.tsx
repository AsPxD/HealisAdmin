import React from 'react';
import { Pill, Package, AlertCircle } from 'lucide-react';

export function PharmacyDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Pharmacy Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Pill className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">Pending Orders</h3>
              <p className="text-2xl font-semibold">15</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">Inventory Items</h3>
              <p className="text-2xl font-semibold">1,234</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">Low Stock Items</h3>
              <p className="text-2xl font-semibold">23</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}