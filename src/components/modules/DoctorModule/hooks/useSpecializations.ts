import { useState, useEffect } from 'react';
import { Specialization } from '../types';
import { mockSpecializations } from '../data/mockData';

export function useSpecializations() {
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSpecializations(mockSpecializations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch specializations'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  return { specializations, isLoading, error };
}