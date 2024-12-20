import React from 'react';
import { Star, Clock, Calendar } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onSelect }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start space-x-4">
        <img
          src={doctor.avatarUrl}
          alt={doctor.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialization}</p>
          
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-600">{doctor.experience} years exp.</span>
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Next available: {doctor.nextAvailable}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{doctor.consultationsToday} today</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => onSelect(doctor)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Schedule Consultation
        </button>
      </div>
    </div>
  );
}