import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Award, 
  Calendar,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

 export const LabProfile = () => {
  const [labData, setLabData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabProfile = async () => {
      try {
        const response = await fetch('/api/lab/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setLabData(data);
      } catch (error) {
        console.error('Error fetching lab profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!labData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">Error loading profile</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Laboratory Profile</h1>
          <p className="text-gray-500">ID: {labData.LabId}</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center ${getStatusColor(labData.status)}`}>
          {labData.status === 'verified' ? (
            <CheckCircle className="w-4 h-4 mr-2" />
          ) : (
            <AlertTriangle className="w-4 h-4 mr-2" />
          )}
          {labData.status.charAt(0).toUpperCase() + labData.status.slice(1)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="relative">
            <img 
              src={labData.photo ? `/uploads/${labData.photo}` : "/api/placeholder/400/400"} 
              alt="Lab Photo" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-lg">
              <h2 className="text-xl font-bold text-white">{labData.labName}</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Building2 className="w-5 h-5" />
              <span>{labData.labName}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>{labData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>{labData.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{labData.address}, {labData.location}</span>
            </div>
          </div>
        </div>

        {/* Experience & Certification */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Experience & Certification</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Experience</p>
                <p className="text-gray-600">{labData.experience} years</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium text-gray-900 mb-2">Certification</p>
              <img 
                src={labData.certificate ? `/uploads/${labData.certificate}` : "/api/placeholder/400/200"} 
                alt="Lab Certificate" 
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Working Hours</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Operating Hours</p>
                <p className="text-gray-600">
                  {labData.availability.startTime} - {labData.availability.endTime}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Available Days</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {labData.availability.days.map((day) => (
                    <span 
                      key={day}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabProfile;