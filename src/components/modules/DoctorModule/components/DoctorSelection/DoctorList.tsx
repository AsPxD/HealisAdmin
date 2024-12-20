import React from 'react';
import { DoctorCard } from './DoctorCard';
import { Doctor } from '../../types';

interface DoctorListProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
}

export function DoctorList({ doctors, onSelectDoctor }: DoctorListProps) {
  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No doctors found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onSelect={onSelectDoctor}
        />
      ))}
    </div>
  );
}