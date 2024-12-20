import { Doctor, Specialization } from '../types';

export const mockSpecializations: Specialization[] = [
  { id: 'cardio', name: 'Cardiology', description: 'Heart and cardiovascular system' },
  { id: 'neuro', name: 'Neurology', description: 'Brain and nervous system' },
  { id: 'ortho', name: 'Orthopedics', description: 'Bones and joints' },
  { id: 'derma', name: 'Dermatology', description: 'Skin conditions' },
  { id: 'pedia', name: 'Pediatrics', description: 'Child healthcare' },
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    rating: 4.8,
    experience: 12,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200',
    nextAvailable: 'Today, 2:00 PM',
    consultationsToday: 8,
    qualifications: ['MD', 'FACC'],
    languages: ['English', 'Spanish'],
    availability: {
      'Monday': [
        { id: '1', startTime: '09:00', endTime: '09:30', isAvailable: true },
        { id: '2', startTime: '10:00', endTime: '10:30', isAvailable: true },
      ],
    },
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurology',
    rating: 4.9,
    experience: 15,
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200',
    nextAvailable: 'Tomorrow, 10:00 AM',
    consultationsToday: 6,
    qualifications: ['MD', 'PhD'],
    languages: ['English', 'Mandarin'],
    availability: {
      'Monday': [
        { id: '1', startTime: '09:00', endTime: '09:30', isAvailable: true },
        { id: '2', startTime: '10:00', endTime: '10:30', isAvailable: true },
      ],
    },
  },
];