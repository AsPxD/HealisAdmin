import React from 'react';
import { Users, Server, Shield, Activity } from 'lucide-react';

const stats = [
  { 
    title: 'Active Users',
    value: '1,234',
    change: '+12.5%',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'System Uptime',
    value: '99.9%',
    change: '+0.1%',
    icon: Server,
    trend: 'up'
  },
  {
    title: 'Security Score',
    value: '95',
    change: '+5',
    icon: Shield,
    trend: 'up'
  },
  {
    title: 'Active Sessions',
    value: '156',
    change: '+23',
    icon: Activity,
    trend: 'up'
  }
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-slate-50 rounded-lg">
              <stat.icon className="w-6 h-6 text-slate-600" />
            </div>
            <span className="text-sm font-medium text-green-600">{stat.change}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</h3>
          <p className="text-sm text-gray-600">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}