import React from 'react';
import { Video, Phone, Users } from 'lucide-react';

const consultationTypes = [
  { 
    icon: Video,
    type: 'Video',
    description: 'Virtual face-to-face consultation'
  },
  { 
    icon: Phone,
    type: 'Audio',
    description: 'Voice-only consultation'
  },
  { 
    icon: Users,
    type: 'In-Person',
    description: 'Physical consultation at clinic'
  }
];

export function DoctorConsultations() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {consultationTypes.map(({ icon: Icon, type, description }) => (
          <button
            key={type}
            className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Icon className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{type}</h3>
            <p className="text-gray-600">{description}</p>
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Consultations</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Patient #{i}</h4>
                  <p className="text-sm text-gray-600">Video Consultation</p>
                </div>
                <span className="text-sm text-blue-600">In 2 hours</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}