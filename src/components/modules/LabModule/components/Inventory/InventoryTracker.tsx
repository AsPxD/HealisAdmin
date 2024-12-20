import React from 'react';
import { Package, AlertCircle, RefreshCcw, TrendingUp } from 'lucide-react';

export function InventoryTracker() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Items', value: '2,345', icon: Package, trend: '+12%' },
          { title: 'Low Stock', value: '18', icon: AlertCircle, trend: '-5%' },
          { title: 'Reorder Soon', value: '24', icon: RefreshCcw, trend: '+8%' }
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <stat.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
              </div>
              <span className="text-sm font-medium text-teal-600">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Critical Items</h3>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            Reorder Items
          </button>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Test Tubes', stock: 50, minimum: 100, status: 'Critical' },
            { name: 'Reagent A', stock: 75, minimum: 100, status: 'Low' },
            { name: 'Sample Containers', stock: 120, minimum: 150, status: 'Warning' }
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Stock: {item.stock} / Minimum: {item.minimum}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.status === 'Critical'
                  ? 'bg-red-100 text-red-800'
                  : item.status === 'Low'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}