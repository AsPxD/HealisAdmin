import { useState, useEffect } from 'react';
import { NotificationItem, NotificationFilters } from '../types';

const initialFilters: NotificationFilters = {
  search: '',
  type: 'all',
  status: 'all'
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filters, setFilters] = useState<NotificationFilters>(initialFilters);

  useEffect(() => {
    // Simulate API call
    const fetchNotifications = async () => {
      // Mock data
      setNotifications([
        {
          id: '1',
          title: 'System Update',
          message: 'New system update available',
          type: 'info',
          timestamp: '2024-03-15 10:30:00',
          read: false
        },
        {
          id: '2',
          title: 'Backup Complete',
          message: 'System backup completed successfully',
          type: 'success',
          timestamp: '2024-03-15 10:00:00',
          read: true
        }
      ]);
    };

    fetchNotifications();
  }, [filters]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  return {
    notifications,
    filters,
    setFilters,
    markAsRead,
    deleteNotification
  };
}