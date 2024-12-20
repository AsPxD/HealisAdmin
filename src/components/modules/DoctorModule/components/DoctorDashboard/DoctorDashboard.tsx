import React from 'react';
import { Users, Calendar, Clock, TrendingUp, Activity, Heart, Brain, Thermometer } from 'lucide-react';
import { LineChart } from './LineChart';
import { StatsCard } from './StatsCard';
import { AppointmentTimeline } from './AppointmentTimeline';

const stats = [
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

const specialtyStats = [
  { name: 'Cardiology', icon: Heart, patients: 342, trend: '+5%' },
  { name: 'Neurology', icon: Brain, patients: 256, trend: '+8%' },
  { name: 'General', icon: Activity, patients: 421, trend: '+3%' },
  { name: 'Pediatrics', icon: Thermometer, patients: 265, trend: '+6%' }
];

export function DoctorDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Patient Visits Trend</h3>
          <LineChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Specialty Distribution</h3>
          <div className="space-y-4">
            {specialtyStats.map((specialty) => (
              <div key={specialty.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <specialty.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{specialty.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{specialty.patients} patients</span>
                  <span className="text-green-600">{specialty.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <AppointmentTimeline />
      </div>
    </div>
  );
}