import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Award, 
  Book, 
  Calendar, 
  User as UserIcon, 
  Clock, 
  FileText 
} from 'lucide-react';

interface DoctorProfileData {
  id: string;
  role: string;
  name: string;
  labName?: string;
  email: string;
  phone: string;
  location: string;
  experience: number;
  photo: string;
  status: string;
  dob?: string;
  certificate?: string;
  qualifications?: string[];
  languagesSpoken?: string[];
  availability?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
}

export function DoctorProfile() {
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:8000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        
        // Ensure arrays are properly initialized
        const processedData = {
          ...data,
          qualifications: Array.isArray(data.qualifications) ? data.qualifications : [],
          languagesSpoken: Array.isArray(data.languagesSpoken) ? data.languagesSpoken : [],
          availability: {
            days: Array.isArray(data.availability?.days) ? data.availability.days : [],
            startTime: data.availability?.startTime || '',
            endTime: data.availability?.endTime || ''
          }
        };
        
        setDoctorProfile(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, []);

  const getProfileImage = () => {
    if (imageError || !doctorProfile?.photo) {
      return 'https://via.placeholder.com/200';
    }
    return `http://localhost:8000/uploads/${doctorProfile.photo}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-red-100 text-red-800 rounded-lg">
        {error}
      </div>
    );
  }

  if (!doctorProfile) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-yellow-100 text-yellow-800 rounded-lg">
        No profile found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      {/* Profile Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
          <img
            src={getProfileImage()}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0"
            onError={() => setImageError(true)}
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              {doctorProfile.name || doctorProfile.labName || 'User'}
            </h2>
            <p className="text-blue-600">
              {doctorProfile.role.charAt(0).toUpperCase() + doctorProfile.role.slice(1)}
            </p>
            <div className="mt-2 text-gray-600">
              <div className="flex justify-center md:justify-start items-center space-x-2">
                <UserIcon className="w-4 h-4" />
                <span>
                  Verification Status:
                  <span className={`ml-2 ${
                    doctorProfile.status === 'verified' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {doctorProfile.status}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Contact Details</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-500" />
              {doctorProfile.email}
            </li>
            <li className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-500" />
              {doctorProfile.phone}
            </li>
            <li className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              {doctorProfile.location}
            </li>
          </ul>
        </div>

        {/* Professional Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Book className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Professional Information</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              Experience: {doctorProfile.experience} Years
            </li>
            {doctorProfile.dob && (
              <li className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                DOB: {new Date(doctorProfile.dob).toLocaleDateString()}
              </li>
            )}
            {doctorProfile.labName && (
              <li className="flex items-center">
                <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                {doctorProfile.role === 'lab' ? 'Lab Name: ' : 'Pharmacy Name: '} 
                {doctorProfile.labName}
              </li>
            )}
          </ul>
        </div>

        {/* Qualifications */}
        {doctorProfile.role === 'doctor' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Qualifications</h3>
            </div>
            <ul className="space-y-2">
              {doctorProfile.qualifications && doctorProfile.qualifications.length > 0 ? (
                doctorProfile.qualifications.map((qual, index) => (
                  <li key={index} className="flex items-center">
                    <Award className="w-4 h-4 mr-2 text-gray-500" />
                    {qual}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No qualifications listed</li>
              )}
            </ul>
            {doctorProfile.certificate && (
              <div className="mt-4">
                <a 
                  href={`http://localhost:8000/uploads/${doctorProfile.certificate}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Certificate
                </a>
              </div>
            )}
          </div>
        )}

        {/* Languages */}
        {doctorProfile.role === 'doctor' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Languages</h3>
            </div>
            <ul className="space-y-2">
              {doctorProfile.languagesSpoken && doctorProfile.languagesSpoken.length > 0 ? (
                doctorProfile.languagesSpoken.map((lang, index) => (
                  <li key={index} className="flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-gray-500" />
                    {lang}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No languages specified</li>
              )}
            </ul>
          </div>
        )}

        {/* Availability */}
        {doctorProfile.role === 'doctor' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Availability</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                Days: {doctorProfile.availability?.days.length > 0 
                  ? doctorProfile.availability.days.join(', ') 
                  : 'Not specified'}
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                Hours: {doctorProfile.availability?.startTime 
                  ? `${doctorProfile.availability.startTime} - ${doctorProfile.availability.endTime}`
                  : 'Not specified'}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}