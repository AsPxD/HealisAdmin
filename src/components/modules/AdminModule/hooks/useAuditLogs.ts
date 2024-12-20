import { useState, useEffect } from 'react';
import { AuditLog } from '../types';

export function useAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setLogs([
          {
            id: '1',
            userId: '1',
            action: 'LOGIN',
            module: 'AUTH',
            details: 'User logged in successfully',
            timestamp: new Date().toISOString(),
            ipAddress: '192.168.1.1'
          },
          // Add more mock logs...
        ]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch audit logs'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return { logs, isLoading, error };
}