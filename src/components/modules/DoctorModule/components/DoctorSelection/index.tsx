import React, { useState, useCallback } from 'react';
import { DoctorFilters } from './DoctorFilters';
import { DoctorList } from './DoctorList';
import { useSpecializations, useDoctors } from '../../hooks';
import { Doctor } from '../../types';

export function DoctorSelection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const { specializations } = useSpecializations();
  const { doctors, isLoading } = useDoctors({
    specialization: selectedSpecialization,
    searchQuery,
  });

  const handleDoctorSelect = useCallback((doctor: Doctor) => {
    // Handle doctor selection - will be implemented with consultation scheduling
    console.log('Selected doctor:', doctor);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DoctorFilters
        specializations={specializations}
        selectedSpecialization={selectedSpecialization}
        searchQuery={searchQuery}
        onSpecializationChange={setSelectedSpecialization}
        onSearchChange={setSearchQuery}
      />
      <DoctorList
        doctors={doctors}
        onSelectDoctor={handleDoctorSelect}
      />
    </div>
  );
}