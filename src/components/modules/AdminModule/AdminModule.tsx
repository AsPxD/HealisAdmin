import React, { useState } from 'react';
import { Header } from '../../shared/Header';
import { AdminDashboard } from './components/Dashboard/AdminDashboard';
import { UserManagement } from './components/Users/UserManagement';
import { SystemSettings } from './components/Settings/SystemSettings';
import { Analytics } from './components/Analytics/Analytics';
import { AuditLogs } from './components/Audit/AuditLogs';
import { Notifications } from './components/Notifications/Notifications';
import { Reports } from './components/Reports/Reports';
import { VaccinationManagement } from './components/Vaccination/VaccinationManagement';
import { DiseaseOutbreakPredictor } from './components/Predictions/DiseaseOutbreakPredictor';
import {
  LayoutDashboard,
  Users,
  Settings,
  LineChart,
  ClipboardList,
  Bell,
  FileText,
  Syringe,
  Brain
} from 'lucide-react';

const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: AdminDashboard },
  { id: 'users', label: 'Users', icon: Users, component: UserManagement },
  { id: 'analytics', label: 'Analytics', icon: LineChart, component: Analytics },
  { id: 'predictions', label: 'ML Predictions', icon: Brain, component: DiseaseOutbreakPredictor },
  { id: 'audit', label: 'Audit Logs', icon: ClipboardList, component: AuditLogs },
  { id: 'notifications', label: 'Notifications', icon: Bell, component: Notifications },
  { id: 'reports', label: 'Reports', icon: FileText, component: Reports },
  { id: 'vaccination', label: 'Vaccination', icon: Syringe, component: VaccinationManagement },
  { id: 'settings', label: 'Settings', icon: Settings, component: SystemSettings }
];

interface AdminModuleProps {
  user: {
    name: string;
    role: 'admin';
  };
  onLogout: () => void;
}

export function AdminModule({ user, onLogout }: AdminModuleProps) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || AdminDashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Navigation Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
            {modules.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveModule(id)}
                className={`relative p-4 rounded-xl transition-all duration-200 ${
                  activeModule === id
                    ? 'bg-gradient-to-br from-slate-800 to-gray-900 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-slate-50 text-gray-700 hover:text-slate-900 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon className={`w-6 h-6 ${
                    activeModule === id ? 'text-white' : 'text-slate-600'
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
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
}