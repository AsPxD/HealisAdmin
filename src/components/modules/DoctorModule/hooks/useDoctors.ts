import { useState, useEffect } from 'react';
import { Doctor } from '../types';
import { mockDoctors } from '../data/mockData';

interface UseDoctorsOptions {
  specialization?: string;
  searchQuery?: string;
}

export function useDoctors({ specialization, searchQuery }: UseDoctorsOptions = {}) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        let filteredDoctors = [...mockDoctors];

        if (specialization) {
          filteredDoctors = filteredDoctors.filter(
            doctor => doctor.specialization === specialization
          );
        }

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredDoctors = filteredDoctors.filter(
            doctor =>
              doctor.name.toLowerCase().includes(query) ||
              doctor.specialization.toLowerCase().includes(query)
          );
        }

        setDoctors(filteredDoctors);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch doctors'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [specialization, searchQuery]);

  return { doctors, isLoading, error };
}