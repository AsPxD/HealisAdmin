import React from 'react';
import { TestTube, Clock, FileText } from 'lucide-react';

export function LabDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Laboratory Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <TestTube className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">Pending Tests</h3>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">Processing</h3>
              <p className="text-2xl font-semibold">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">Reports Ready</h3>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}