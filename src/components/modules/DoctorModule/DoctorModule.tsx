import React, { useState } from 'react';
import { Header } from '../../shared/Header';
import { DoctorDashboard } from './components/DoctorDashboard/DoctorDashboard';
import { DoctorChat } from './components/DoctorChat/DoctorChat';
import { DoctorProfile } from './components/DoctorProfile/DoctorProfile';
import { Appointments } from './components/Appointments/Appointments';
import { PatientSearch } from './components/PatientRecords/PatientRecords';
import { Prescriptions } from './components/Prescriptions/Prescriptions';
import { DoctorSettings } from './components/DoctorSettings/DoctorSettings';
import {
  LayoutDashboard,
  MessageSquare,
  UserCircle,
  Calendar,
  ClipboardList,
  PillIcon,
  Settings
} from 'lucide-react';

interface DoctorModuleProps {
  user: {
    name: string;
    role: 'doctor';
  };
  onLogout: () => void;
}

const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: DoctorDashboard },
  { id: 'chat', label: 'Patient Chat', icon: MessageSquare, component: DoctorChat },
  { id: 'appointments', label: 'Appointments', icon: Calendar, component: Appointments },
  { id: 'records', label: 'Patient Records', icon: ClipboardList, component: PatientSearch },
  { id: 'prescriptions', label: 'Prescriptions', icon: PillIcon, component: Prescriptions },
  { id: 'profile', label: 'My Profile', icon: UserCircle, component: DoctorProfile },
  { id: 'settings', label: 'Settings', icon: Settings, component: DoctorSettings }
];

export function DoctorModule({ user, onLogout }: DoctorModuleProps) {
  const [activeModule, setActiveModule] = useState('dashboard');

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || DoctorDashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          {/* Navigation Cards */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
            {modules.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveModule(id)}
                className={`relative p-4 rounded-xl transition-all duration-200 ${
                  activeModule === id
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon className={`w-6 h-6 ${
                    activeModule === id ? 'text-white' : 'text-blue-600'
                  }`} />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                {activeModule === id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-7 bg-white rounded-2xl shadow-sm p-6">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
}