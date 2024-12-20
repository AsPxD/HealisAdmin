import React from 'react';
import { Pill, Package, AlertCircle, Activity } from 'lucide-react';
import { StatCard } from '../../shared/StatCard';
import { useInventoryStats } from '../../hooks/useInventoryStats';

export function PharmacyDashboard() {
  const { stats } = useInventoryStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Pharmacy Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Pending Orders"
          value="15"
          icon={Pill}
          trend="up"
          trendValue="+23%"
          color="blue"
        />
        <StatCard
          title="Inventory Items"
          value="1,234"
          icon={Package}
          trend="down"
          trendValue="-5%"
          color="green"
        />
        <StatCard
          title="Low Stock Items"
          value="23"
          icon={AlertCircle}
          trend="up"
          trendValue="+12%"
          color="red"
        />
      </div>
    </div>
  );
}