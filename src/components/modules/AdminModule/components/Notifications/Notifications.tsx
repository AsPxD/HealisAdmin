import React from 'react';
import { Bell } from 'lucide-react';
import { NotificationList } from './NotificationList';
import { NotificationFilters } from './NotificationFilters';
import { useNotifications } from '../../hooks/useNotifications';

export function Notifications() {
  const {
    notifications,
    filters,
    setFilters,
    markAsRead,
    deleteNotification
  } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">System Notifications</h2>
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="text-sm font-medium text-slate-600">
            {notifications.filter(n => !n.read).length} Unread
          </span>
        </div>
      </div>

      <NotificationFilters
        filters={filters}
        onFilterChange={setFilters}
      />

      <NotificationList
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onDelete={deleteNotification}
      />
    </div>
  );
}