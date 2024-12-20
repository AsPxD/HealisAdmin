import React, { useState } from 'react';
import { Header } from '../../shared/Header';
import { PharmacyDashboard } from './components/Dashboard/PharmacyDashboard';
import { InventoryManagement } from './components/Inventory/InventoryManagement';
import { PrescriptionCenter } from './components/Prescriptions/PrescriptionCenter';
import { SmartAnalytics } from './components/Analytics/SmartAnalytics';
import { AutomatedDispensing } from './components/Dispensing/AutomatedDispensing';
import { QualityControl } from './components/Quality/QualityControl';
import { DrugInteractions } from './components/Interactions/DrugInteractions';
import { OrderService } from './components/OrderService/OrderService';
import {
  LayoutDashboard,
  Package,
  FileText,
  Brain,
  Box,
  ShieldCheck,
  AlertTriangle,
  ShoppingCart
} from 'lucide-react';

const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: PharmacyDashboard },
  { id: 'orders', label: 'Order Service', icon: ShoppingCart, component: OrderService },
  { id: 'inventory', label: 'Smart Inventory', icon: Package, component: InventoryManagement },
  { id: 'prescriptions', label: 'Prescriptions', icon: FileText, component: PrescriptionCenter },
  { id: 'analytics', label: 'ML Analytics', icon: Brain, component: SmartAnalytics },
  { id: 'dispensing', label: 'Auto Dispensing', icon: Box, component: AutomatedDispensing },
  { id: 'quality', label: 'Quality Control', icon: ShieldCheck, component: QualityControl },
  { id: 'interactions', label: 'Drug Interactions', icon: AlertTriangle, component: DrugInteractions }
];

interface PharmacyModuleProps {
  user: {
    name: string;
    role: 'pharmacy';
  };
  onLogout: () => void;
}

export function PharmacyModule({ user, onLogout }: PharmacyModuleProps) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || PharmacyDashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Navigation Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4">
            {modules.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveModule(id)}
                className={`relative p-4 rounded-xl transition-all duration-200 ${
                  activeModule === id
                    ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-600 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon className={`w-6 h-6 ${
                    activeModule === id ? 'text-white' : 'text-purple-600'
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