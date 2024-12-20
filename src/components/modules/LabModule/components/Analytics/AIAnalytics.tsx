import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

export function AIAnalytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">AI-Powered Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h3 className="text-lg font-semibold">Predictive Analysis</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Anomaly Detection</span>
                <span className="text-purple-600">98% accuracy</span>
              </div>
              <div className="mt-2 h-2 bg-purple-100 rounded-full">
                <div className="h-full w-[98%] bg-purple-600 rounded-full" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Pattern Recognition</span>
                <span className="text-purple-600">95% accuracy</span>
              </div>
              <div className="mt-2 h-2 bg-purple-100 rounded-full">
                <div className="h-full w-[95%] bg-purple-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>

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
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-500">Processing</span>
                </div>
                <p className="text-2xl font-semibold mt-2">156</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <div className="space-y-4">
          {[
            { title: 'Equipment Maintenance', priority: 'High', accuracy: '99%' },
            { title: 'Test Calibration', priority: 'Medium', accuracy: '95%' },
            { title: 'Resource Optimization', priority: 'Low', accuracy: '90%' }
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{item.title}</h4>
                <span className={`text-sm ${
                  item.priority === 'High' ? 'text-red-600' :
                  item.priority === 'Medium' ? 'text-amber-600' :
                  'text-green-600'
                }`}>
                  {item.priority} Priority
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">AI Confidence</span>
                <p className="font-semibold text-blue-600">{item.accuracy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}