import { LucideIcon } from 'lucide-react';

export interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

export interface SpecialtyStat {
  name: string;
  icon: LucideIcon;
  patients: number;
  trend: string;
}

export interface Appointment {
  time: string;
  patient: string;
  type: 'video' | 'audio' | 'in-person';
  status: 'completed' | 'in-progress' | 'upcoming';
  duration: string;
}