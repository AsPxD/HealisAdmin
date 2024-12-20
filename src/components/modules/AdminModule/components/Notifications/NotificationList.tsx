import React from 'react';
import { Bell, Clock, CheckCircle, XCircle } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationListProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationList({ notifications, onMarkAsRead, onDelete }: NotificationListProps) {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`p-4 bg-white rounded-lg shadow-sm border-l-4 ${
            notification.type === 'info' ? 'border-blue-500' :
            notification.type === 'success' ? 'border-green-500' :
            notification.type === 'warning' ? 'border-amber-500' :
            'border-red-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                notification.type === 'info' ? 'bg-blue-50' :
                notification.type === 'success' ? 'bg-green-50' :
                notification.type === 'warning' ? 'bg-amber-50' :
                'bg-red-50'
              }`}>
                <Bell className={`w-5 h-5 ${
                  notification.type === 'info' ? 'text-blue-500' :
                  notification.type === 'success' ? 'text-green-500' :
                  notification.type === 'warning' ? 'text-amber-500' :
                  'text-red-500'
                }`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{notification.timestamp}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!notification.read && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="p-1 text-gray-400 hover:text-green-500"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => onDelete(notification.id)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}