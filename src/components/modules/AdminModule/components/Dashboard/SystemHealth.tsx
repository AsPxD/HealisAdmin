import React from 'react';
import { Server, Cpu, Database, Network } from 'lucide-react';

const metrics = [
  { name: 'CPU Usage', value: '45%', icon: Cpu },
  { name: 'Memory Usage', value: '62%', icon: Server },
  { name: 'Database', value: '89%', icon: Database },
  { name: 'Network', value: '94%', icon: Network }
];

export function SystemHealth() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <metric.icon className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-900">{metric.name}</span>
            </div>
            <div className="flex items-center">
              <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: metric.value }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900">{metric.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}