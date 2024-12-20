import React from 'react';
import { Bell, Lock, User, Clock, Palette, Globe } from 'lucide-react';

const settingsSections = [
  {
    title: 'Profile Settings',
    icon: User,
    description: 'Update your personal information and credentials',
  },
  {
    title: 'Security',
    icon: Lock,
    description: 'Manage your password and security preferences',
  },
  {
    title: 'Notifications',
    icon: Bell,
    description: 'Configure how you receive alerts and updates',
  },
  {
    title: 'Availability',
    icon: Clock,
    description: 'Set your working hours and consultation slots',
  },
  {
    title: 'Appearance',
    icon: Palette,
    description: 'Customize your interface preferences',
  },
  {
    title: 'Language',
    icon: Globe,
    description: 'Change your preferred language',
  },
];

export function DoctorSettings() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map(({ title, icon: Icon, description }) => (
          <button
            key={title}
            className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-900">{title}</h3>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}