import React from 'react';
import { Clock, User, Settings, Shield } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Dr. Sarah Johnson',
    action: 'Updated system settings',
    timestamp: '5 minutes ago',
    icon: Settings,
    type: 'settings'
  },
  {
    id: 2,
    user: 'Admin Team',
    action: 'Security audit completed',
    timestamp: '1 hour ago',
    icon: Shield,
    type: 'security'
  },
  {
    id: 3,
    user: 'James Wilson',
    action: 'New user account created',
    timestamp: '2 hours ago',
    icon: User,
    type: 'user'
  }
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <activity.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {activity.timestamp}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}