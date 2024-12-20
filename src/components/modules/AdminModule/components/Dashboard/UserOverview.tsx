import React from 'react';
import { Users, UserCheck, UserMinus, UserPlus } from 'lucide-react';

const userStats = [
  { label: 'Total Users', value: '1,234', icon: Users, color: 'blue' },
  { label: 'Active Now', value: '156', icon: UserCheck, color: 'green' },
  { label: 'New Today', value: '12', icon: UserPlus, color: 'purple' },
  { label: 'Inactive', value: '23', icon: UserMinus, color: 'amber' }
];

export function UserOverview() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">User Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        {userStats.map((stat) => (
          <div key={stat.label} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}