import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle, Thermometer } from 'lucide-react';

export function QualityControl() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quality Control</h2>
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">System Protected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <ShieldCheck className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">Quality Score</h3>
              <p className="text-3xl font-bold text-green-600">98.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
            <div>
              <h3 className="text-lg font-semibold">Pending Reviews</h3>
              <p className="text-3xl font-bold text-amber-600">12</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <Thermometer className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold">Storage Conditions</h3>
              <p className="text-3xl font-bold text-blue-600">Optimal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Quality Checks</h3>
        <div className="space-y-4">
          {[
            { test: 'Temperature Monitoring', status: 'Passed', accuracy: '99.9%', date: '2024-03-15' },
            { test: 'Humidity Control', status: 'Warning', accuracy: '95.5%', date: '2024-03-15' },
            { test: 'Storage Compliance', status: 'Failed', accuracy: '85.0%', date: '2024-03-14' }
          ].map((check) => (
            <div key={check.test} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{check.test}</p>
                <p className="text-sm text-gray-500">{check.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Accuracy: {check.accuracy}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  check.status === 'Passed'
                    ? 'bg-green-100 text-green-800'
                    : check.status === 'Warning'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {check.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}