import React from 'react';
import { Microscope, BookOpen, Share2, Users } from 'lucide-react';

export function ResearchHub() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Research Hub</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <BookOpen className="w-8 h-8 text-teal-600" />
            <h3 className="text-lg font-semibold">Active Studies</h3>
          </div>
          <div className="space-y-4">
            {[
              { title: 'COVID-19 Variants Analysis', participants: 1200, status: 'Active' },
              { title: 'Biomarker Research', participants: 500, status: 'Recruiting' },
              { title: 'Drug Efficacy Study', participants: 800, status: 'Active' }
            ].map((study) => (
              <div key={study.title} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{study.title}</h4>
                    <p className="text-sm text-gray-500">
                      {study.participants} participants
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    study.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {study.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Share2 className="w-8 h-8 text-teal-600" />
            <h3 className="text-lg font-semibold">Research Network</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Central Research Lab', role: 'Lead Institution', members: 45 },
              { name: 'University Hospital', role: 'Collaborator', members: 32 },
              { name: 'Medical Research Center', role: 'Partner', members: 28 }
            ].map((partner) => (
              <div key={partner.name} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{partner.name}</h4>
                    <p className="text-sm text-gray-500">{partner.role}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {partner.members} members
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}