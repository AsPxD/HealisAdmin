import { useState, useEffect } from 'react';
import { AnalyticsData } from '../types';

export function useAnalytics(timeframe: string = '7d') {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setData({
          timeframe,
          metrics: {
            activeUsers: 1250,
            totalAppointments: 450,
            completedTests: 320,
            prescriptionsFilled: 890,
            vaccinesAdministered: 156
          },
          trends: {
            users: [120, 145, 150, 148, 155, 160, 165],
            appointments: [40, 45, 42, 48, 50, 47, 45]
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeframe]);

  return { data, isLoading, error };
}