import React, { useState } from 'react';
import { Header } from '../../shared/Header';
import { LabDashboard } from './components/Dashboard/LabDashboard';
import { ReportManagement } from './components/Reports/ReportManagement';
import { AIAnalytics } from './components/Analytics/AIAnalytics';
import { LabIntegration } from './components/Integration/LabIntegration';
import { QualityControl } from './components/Quality/QualityControl';
import { InventoryTracker } from './components/Inventory/InventoryTracker';
import { ResearchHub } from './components/Research/ResearchHub';
import {
  LayoutDashboard,
  FileText,
  Brain,
  Network,
  ShieldCheck,
  Package,
  Microscope
} from 'lucide-react';

const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: LabDashboard },
  { id: 'reports', label: 'Reports', icon: FileText, component: ReportManagement },
  { id: 'ai-analytics', label: 'AI Analytics', icon: Brain, component: AIAnalytics },
  { id: 'integration', label: 'Lab Network', icon: Network, component: LabIntegration },
  { id: 'quality', label: 'Quality Control', icon: ShieldCheck, component: QualityControl },
  { id: 'inventory', label: 'Inventory', icon: Package, component: InventoryTracker },
  { id: 'research', label: 'Research', icon: Microscope, component: ResearchHub }
];

export function LabModule({ user, onLogout }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || LabDashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Navigation Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {modules.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveModule(id)}
                className={`relative p-4 rounded-xl transition-all duration-200 ${
                  activeModule === id
                    ? 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-teal-50 text-gray-700 hover:text-teal-600 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon className={`w-6 h-6 ${
                    activeModule === id ? 'text-white' : 'text-teal-600'
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