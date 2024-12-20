import React from 'react';
import { TestTube, Clock, FileText, Activity, AlertTriangle, Beaker } from 'lucide-react';

const stats = [
  { title: 'Pending Tests', value: '24', icon: TestTube, color: 'blue' },
  { title: 'In Progress', value: '12', icon: Clock, color: 'amber' },
  { title: 'Completed Today', value: '45', icon: FileText, color: 'green' },
  { title: 'Critical Results', value: '3', icon: AlertTriangle, color: 'red' }
];

export function LabDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Laboratory Dashboard</h2>
        <div className="flex items-center space-x-2 text-teal-600">
          <Activity className="w-5 h-5" />
          <span className="font-medium">Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ title, value, icon: Icon, color }) => (
          <div key={title} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-4">
              <div className={`p-3 bg-${color}-50 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Tests</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Beaker className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="font-medium">Blood Analysis</p>
                    <p className="text-sm text-gray-500">Patient #{i}</p>
                  </div>
                </div>
                <span className="text-sm text-teal-600 font-medium">In Progress</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Equipment Status</h3>
          <div className="space-y-4">
            {[
              { name: 'Analyzer XR-3000', status: 'Operational', uptime: '99.9%' },
              { name: 'Centrifuge C-200', status: 'Maintenance', uptime: '85.5%' },
              { name: 'Microscope M-500', status: 'Operational', uptime: '98.2%' }
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Uptime: {item.uptime}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'Operational' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}