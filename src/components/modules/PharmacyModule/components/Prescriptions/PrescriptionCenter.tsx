import React from 'react';
import { FileText, Search, Filter, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Prescription } from '../../types';

const mockPrescriptions: Prescription[] = [
  {
    id: 'RX-1234',
    patientId: 'P-001',
    patientName: 'John Smith',
    medications: [
      {
        id: 'M-001',
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Every 8 hours',
        duration: '7 days',
        instructions: 'Take with food'
      }
    ],
    status: 'pending',
    issuedDate: '2024-03-15'
  }
];

export function PrescriptionCenter() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Prescription Center</h2>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">
            Processing Time: 15m avg
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {mockPrescriptions.map((prescription) => (
            <div key={prescription.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {prescription.patientName}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {prescription.id}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Issued: {prescription.issuedDate}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  prescription.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : prescription.status === 'processing'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {prescription.medications.map((medication) => (
                  <div
                    key={medication.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{medication.name}</p>
                      <p className="text-sm text-gray-500">
                        {medication.dosage} - {medication.frequency}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        Duration: {medication.duration}
                      </p>
                      <p className="text-sm text-gray-500">{medication.instructions}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  View Details
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                  Process Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}