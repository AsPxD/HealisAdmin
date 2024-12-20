import React from 'react';
import { Network, Link, Globe, Server } from 'lucide-react';

export function LabIntegration() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Lab Network Integration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Network className="w-8 h-8 text-teal-600" />
            <h3 className="text-lg font-semibold">Connected Labs</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Central Hospital Lab', status: 'Connected', tests: 1234 },
              { name: 'Research Center Lab', status: 'Connected', tests: 856 },
              { name: 'Regional Clinic Lab', status: 'Connecting', tests: 0 }
            ].map((lab) => (
              <div key={lab.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{lab.name}</p>
                  <p className="text-sm text-gray-500">{lab.tests} tests synced</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  lab.status === 'Connected'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {lab.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Globe className="w-8 h-8 text-teal-600" />
            <h3 className="text-lg font-semibold">Network Status</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: 'API Gateway', status: 'Operational', latency: '45ms' },
              { name: 'Data Sync', status: 'Operational', latency: '120ms' },
              { name: 'Auth Service', status: 'Operational', latency: '35ms' }
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Server className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-500">Latency: {service.latency}</p>
                  </div>
                </div>
                <span className="text-green-600 font-medium">{service.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}