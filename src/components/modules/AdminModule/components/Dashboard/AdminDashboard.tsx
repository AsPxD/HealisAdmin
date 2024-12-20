import React from 'react';
import { DashboardStats } from './DashboardStats';
import { RecentActivity } from './RecentActivity';
import { SystemHealth } from './SystemHealth';
import { UserOverview } from './UserOverview';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserOverview />
        <SystemHealth />
      </div>
      
      <RecentActivity />
    </div>
  );
}