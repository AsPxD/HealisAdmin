export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: number;
  avatarUrl: string;
  nextAvailable: string;
  consultationsToday: number;
  qualifications: string[];
  languages: string[];
  availability: {
    [key: string]: TimeSlot[];
  };
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Specialization {
  id: string;
  name: string;
  description: string;
}

export interface Consultation {
  id: string;
  doctorId: string;
  patientId: string;
  type: 'video' | 'audio' | 'in-person';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  consultationId: string;
  medications: Medication[];
  instructions: string;
  issuedDate: string;
  validUntil: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}