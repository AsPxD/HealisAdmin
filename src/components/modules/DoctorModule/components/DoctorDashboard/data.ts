import { Users, Calendar, Clock, TrendingUp, Activity, Heart, Brain, Thermometer } from 'lucide-react';
import { StatCard, SpecialtyStat, Appointment } from './types';

export const dashboardStats: StatCard[] = [
  { 
    title: 'Total Patients',
    value: '1,284',
    change: '+12.5%',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Today\'s Appointments',
    value: '24',
    change: '+4',
    icon: Calendar,
    trend: 'up'
  },
  {
    title: 'Average Wait Time',
    value: '14min',
    change: '-2min',
    icon: Clock,
    trend: 'down'
  },
  {
    title: 'Patient Satisfaction',
    value: '94%',
    change: '+2.3%',
    icon: TrendingUp,
    trend: 'up'
  }
];

export const specialtyStats: SpecialtyStat[] = [
  { name: 'Cardiology', icon: Heart, patients: 342, trend: '+5%' },
  { name: 'Neurology', icon: Brain, patients: 256, trend: '+8%' },
  { name: 'General', icon: Activity, patients: 421, trend: '+3%' },
  { name: 'Pediatrics', icon: Thermometer, patients: 265, trend: '+6%' }
];

export const todayAppointments: Appointment[] = [
  {
    time: '09:00 AM',
    patient: 'Sarah Johnson',
    type: 'video',
    status: 'completed',
    duration: '30min'
  },
  {
    time: '10:00 AM',
    patient: 'Michael Chen',
    type: 'in-person',
    status: 'in-progress',
    duration: '45min'
  },
  {
    time: '11:30 AM',
    patient: 'Emma Davis',
    type: 'audio',
    status: 'upcoming',
    duration: '30min'
  }
];