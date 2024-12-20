import { useState, useEffect } from 'react';
import { User, UserFilters } from '../types';

const initialFilters: UserFilters = {
  search: '',
  role: '',
  status: '',
};

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<UserFilters>(initialFilters);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setUsers([
          {
            id: '1',
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@example.com',
            role: 'doctor',
            status: 'active',
            lastLogin: '2 hours ago',
            permissions: ['view_patients', 'create_prescriptions']
          },
          {
            id: '2',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            status: 'active',
            lastLogin: '5 minutes ago',
            permissions: ['all']
          },
          // Add more mock users as needed
        ]);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [filters]);

  return { users, isLoading, filters, setFilters };
}