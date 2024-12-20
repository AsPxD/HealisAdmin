import React from 'react';
import { Syringe, Calendar, Users, Activity } from 'lucide-react';

export function VaccinationManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Vaccination Management</h2>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-slate-600" />
          <span className="text-sm font-medium text-slate-600">Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Syringe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Today's Vaccinations</p>
              <h3 className="text-2xl font-bold text-gray-900">156</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <h3 className="text-2xl font-bold text-gray-900">89</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Vaccinated</p>
              <h3 className="text-2xl font-bold text-gray-900">12,456</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', patient: 'John Smith', vaccine: 'COVID-19 Booster', status: 'Completed' },
              { time: '10:30 AM', patient: 'Emma Wilson', vaccine: 'Flu Shot', status: 'In Progress' },
              { time: '11:45 AM', patient: 'Michael Brown', vaccine: 'HPV Vaccine', status: 'Scheduled' }
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600">{appointment.time}</span>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patient}</p>
                    <p className="text-sm text-gray-600">{appointment.vaccine}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Vaccine Inventory</h3>
          <div className="space-y-4">
            {[
              { name: 'COVID-19 Vaccine', stock: 500, allocated: 89, temp: '2-8°C' },
              { name: 'Influenza Vaccine', stock: 300, allocated: 45, temp: '2-8°C' },
              { name: 'HPV Vaccine', stock: 200, allocated: 23, temp: '2-8°C' }
            ].map((vaccine, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{vaccine.name}</h4>
                    <p className="text-sm text-gray-600">Storage: {vaccine.temp}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{vaccine.stock} doses</p>
                    <p className="text-sm text-gray-600">{vaccine.allocated} allocated</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(vaccine.allocated / vaccine.stock) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}