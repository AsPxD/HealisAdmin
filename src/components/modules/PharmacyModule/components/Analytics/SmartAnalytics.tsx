import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Package, Users, Clock } from 'lucide-react';

export function SmartAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">ML-Powered Analytics</h2>
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">AI Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Predictive Analytics */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h3 className="text-lg font-semibold">Demand Prediction</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Accuracy Rate</span>
                <span className="text-purple-600 font-medium">98.5%</span>
              </div>
              <div className="mt-2 h-2 bg-purple-100 rounded-full">
                <div className="h-full w-[98.5%] bg-purple-600 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Next Week Demand</p>
                <p className="text-lg font-semibold text-purple-600">+15.3%</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Stock Optimization</p>
                <p className="text-lg font-semibold text-green-600">92.8%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Monitoring */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h3 className="text-lg font-semibold">Real-time Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span className="text-sm text-gray-500">Alerts</span>
                </div>
                <p className="text-2xl font-semibold mt-2">24</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <Package className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-500">Processing</span>
                </div>
                <p className="text-2xl font-semibold mt-2">156</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">Peak Hours Prediction</h4>
              <div className="h-24 bg-gray-50 rounded-lg flex items-end p-2 space-x-1">
                {[40, 65, 85, 95, 70, 55, 45].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-600 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>9AM</span>
                <span>3PM</span>
                <span>9PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4 mb-4">
            <AlertTriangle className="w-8 h-8 text-rose-600" />
            <h3 className="text-lg font-semibold">Anomaly Detection</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Unusual Patterns</span>
                <span className="text-rose-600 font-medium">3 detected</span>
              </div>
              <div className="space-y-2">
                {[
                  { type: 'Usage Spike', confidence: '95%' },
                  { type: 'Order Pattern', confidence: '87%' },
                  { type: 'Stock Level', confidence: '92%' }
                ].map((anomaly) => (
                  <div
                    key={anomaly.type}
                    className="flex items-center justify-between text-sm p-2 bg-rose-50 rounded"
                  >
                    <span>{anomaly.type}</span>
                    <span className="text-rose-600">{anomaly.confidence}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">Risk Assessment</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">Patient Safety</span>
                </div>
                <span className="text-green-600 font-medium">99.9%</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">Response Time</span>
                </div>
                <span className="text-amber-600 font-medium">45s avg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ML Recommendations */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Inventory Optimization',
              description: 'Reduce overstock of seasonal medications',
              impact: 'High',
              savings: '$12,450'
            },
            {
              title: 'Order Scheduling',
              description: 'Adjust bulk order timing for better efficiency',
              impact: 'Medium',
              savings: '$8,230'
            },
            {
              title: 'Staff Allocation',
              description: 'Optimize staffing based on predicted rush hours',
              impact: 'High',
              savings: '$15,700'
            }
          ].map((rec) => (
            <div key={rec.title} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{rec.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  rec.impact === 'High'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {rec.impact}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">Potential Savings</span>
                <span className="text-green-600 font-medium">{rec.savings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}