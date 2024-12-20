import React from 'react';
import { Box, RotateCw, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

export function AutomatedDispensing() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Automated Dispensing System</h2>
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-600">System Online</span>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Units', value: '8/8', icon: Box, color: 'green' },
          { label: 'Processing', value: '12', icon: RotateCw, color: 'blue' },
          { label: 'Completed', value: '156', icon: CheckCircle, color: 'purple' },
          { label: 'Alerts', value: '2', icon: AlertTriangle, color: 'amber' }
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-4">
              <div className={`p-3 bg-${color}-50 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Dispensing Units */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Active Dispensing Units</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((unit) => (
            <div key={unit} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Unit {unit}</span>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Temperature</span>
                  <span className="text-gray-900">20.5°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Humidity</span>
                  <span className="text-gray-900">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Calibration</span>
                  <span className="text-gray-900">2h ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Current Operations</h3>
          <div className="space-y-4">
            {[
              { id: 'RX-1234', status: 'Processing', progress: 75 },
              { id: 'RX-1235', status: 'Queued', progress: 0 },
              { id: 'RX-1236', status: 'Verifying', progress: 90 }
            ].map((op) => (
              <div key={op.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">Order {op.id}</span>
                    <span className="ml-2 text-sm text-gray-500">{op.status}</span>
                  </div>
                  <span className="text-sm font-medium text-purple-600">
                    {op.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${op.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">System Performance</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Accuracy Metrics</h4>
              <div className="space-y-2">
                {[
                  { label: 'Dispensing Accuracy', value: '99.99%' },
                  { label: 'Label Verification', value: '100%' },
                  { label: 'Weight Check', value: '99.95%' }
                ].map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <span className="font-medium text-green-600">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Efficiency Metrics</h4>
              <div className="space-y-2">
                {[
                  { label: 'Average Processing Time', value: '45s' },
                  { label: 'Daily Throughput', value: '450 orders' },
                  { label: 'Error Rate', value: '0.01%' }
                ].map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <span className="font-medium text-blue-600">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}