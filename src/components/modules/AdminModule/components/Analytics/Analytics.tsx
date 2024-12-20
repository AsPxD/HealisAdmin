import React from 'react';
import { TrendingUp, Users, Clock, Activity } from 'lucide-react';

export function Analytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Analytics</h2>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Active Users', value: '1,234', trend: '+12%', icon: Users },
          { title: 'Response Time', value: '45ms', trend: '-5%', icon: Clock },
          { title: 'System Load', value: '67%', trend: '+3%', icon: Activity },
          { title: 'Growth Rate', value: '23%', trend: '+8%', icon: TrendingUp }
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-slate-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-slate-600" />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.trend}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Usage Graph */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">System Usage</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Usage Graph Placeholder</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {[
              { label: 'CPU Usage', value: '45%' },
              { label: 'Memory Usage', value: '62%' },
              { label: 'Disk Space', value: '78%' },
              { label: 'Network Load', value: '34%' }
            ].map((metric) => (
              <div key={metric.label} className="flex items-center justify-between">
                <span className="text-gray-600">{metric.label}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-slate-600 rounded-full"
                      style={{ width: metric.value }}
                    />
                  </div>
                  <span className="text-sm font-medium">{metric.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <div className="space-y-4">
            {[
              { time: '10:00 AM', action: 'User Login', user: 'John Doe' },
              { time: '10:15 AM', action: 'Profile Update', user: 'Sarah Smith' },
              { time: '10:30 AM', action: 'Report Generated', user: 'Mike Johnson' },
              { time: '10:45 AM', action: 'Settings Changed', user: 'Emma Wilson' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user}</p>
                </div>
                <span className="text-sm text-gray-600">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}