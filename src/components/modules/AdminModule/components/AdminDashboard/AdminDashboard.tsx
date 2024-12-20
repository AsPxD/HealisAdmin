import React from 'react';
import { Users, Activity, Shield } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Administration</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">Active Users</h3>
              <p className="text-2xl font-semibold">156</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">System Status</h3>
              <p className="text-2xl font-semibold">Healthy</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">Security Alerts</h3>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}