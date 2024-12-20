import React, { useState } from 'react';
import { Upload, Search, Filter, FileText, BarChart2, Share2 } from 'lucide-react';

export function ReportManagement() {
  const [view, setView] = useState('grid');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Report Management</h2>
        <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Report
        </button>
      </div>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports by patient, test type, or date..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <FileText className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-medium">Blood Analysis Report</h3>
                  <p className="text-sm text-gray-500">Patient #{i}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-400 hover:text-teal-600">
                  <BarChart2 className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-teal-600">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="text-teal-600 font-medium">Completed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="text-gray-700">March 15, 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Test Type</span>
                <span className="text-gray-700">Hematology</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}