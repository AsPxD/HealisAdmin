import React from 'react';
import { AlertTriangle, Search, Shield, Activity } from 'lucide-react';

export function DrugInteractions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Drug Interactions Analyzer</h2>
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">AI-Powered Analysis</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for medications to check interactions..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="mt-6 space-y-4">
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900">Potential Interaction Detected</h3>
                <p className="mt-1 text-sm text-amber-700">
                  Warfarin + Aspirin: Increased risk of bleeding
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Primary Medication</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">Warfarin 5mg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">Anticoagulant</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Interacting Medication</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">Aspirin 100mg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">NSAID</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Interaction Analysis</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Severity</span>
                  <span className="text-sm text-red-600 font-medium">High</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-4/5 bg-red-500 rounded-full" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Documentation</span>
                  <span className="text-sm text-green-600 font-medium">Strong</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-[90%] bg-green-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Interaction Checks</h3>
        <div className="space-y-4">
          {[
            { time: '10:30 AM', medications: ['Lisinopril', 'Spironolactone'], severity: 'Low' },
            { time: '11:15 AM', medications: ['Metformin', 'Glipizide'], severity: 'None' },
            { time: '12:00 PM', medications: ['Warfarin', 'Aspirin'], severity: 'High' }
          ].map((check, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Activity className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{check.medications.join(' + ')}</p>
                  <p className="text-sm text-gray-500">{check.time}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                check.severity === 'High'
                  ? 'bg-red-100 text-red-800'
                  : check.severity === 'Low'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {check.severity} Risk
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}