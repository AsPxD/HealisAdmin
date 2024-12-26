import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Check, 
  X, 
  User 
} from 'lucide-react';

interface PharmacyProfile {
  labName: string;
  email: string;
  phone: string;
  location: string;
  experience: number;
  photo: string;
  certificate: string;
  availability: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  status: string;
}

export function QualityControl() {
  const [pharmacyProfile, setPharmacyProfile] = useState<PharmacyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPharmacyProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get('/api/pharmacy/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPharmacyProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch pharmacy profile');
        setLoading(false);
      }
    };

    fetchPharmacyProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!pharmacyProfile) {
    return <div>No pharmacy profile found</div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
            <img 
              src={`http://localhost:8000/uploads/${pharmacyProfile.photo}`} 
              alt={pharmacyProfile.labName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-6 text-white">
            <h1 className="text-3xl font-bold">{pharmacyProfile.labName}</h1>
            <div className="flex items-center mt-2">
              {pharmacyProfile.status === 'verified' ? (
                <Check className="w-6 h-6 text-green-400 mr-2" />
              ) : (
                <X className="w-6 h-6 text-red-400 mr-2" />
              )}
              <span className="text-lg font-medium">
                {pharmacyProfile.status === 'verified' 
                  ? 'Verified Pharmacy' 
                  : 'Pending Verification'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid md:grid-cols-2 gap-6 p-8">
          <div className="space-y-4">
            <DetailItem 
              icon={<Mail className="w-6 h-6 text-blue-600" />} 
              label="Email" 
              value={pharmacyProfile.email} 
            />
            <DetailItem 
              icon={<Phone className="w-6 h-6 text-green-600" />} 
              label="Phone" 
              value={pharmacyProfile.phone} 
            />
            <DetailItem 
              icon={<MapPin className="w-6 h-6 text-red-600" />} 
              label="Location" 
              value={pharmacyProfile.location} 
            />
          </div>
          
          <div className="space-y-4">
            <DetailItem 
              icon={<Building2 className="w-6 h-6 text-purple-600" />} 
              label="Experience" 
              value={`${pharmacyProfile.experience} Years`} 
            />
            <DetailItem 
              icon={<Clock className="w-6 h-6 text-orange-600" />} 
              label="Operating Hours" 
              value={`${pharmacyProfile.availability.startTime} - ${pharmacyProfile.availability.endTime}`} 
            />
            <DetailItem 
              icon={<Award className="w-6 h-6 text-yellow-600" />} 
              label="Available Days" 
              value={pharmacyProfile.availability.days.join(', ')} 
            />
          </div>
        </div>

        {/* Certificates Section */}
        <div className="bg-gray-50 p-6">
          <h2 className="text-xl font-semibold mb-4">Certificates</h2>
          <div className="w-full h-64 border-2 border-dashed border-blue-300 rounded-lg">
            <img 
              src={`http://localhost:8000/uploads/${pharmacyProfile.certificate}`} 
              alt="Pharmacy Certificate" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Detail Items
const DetailItem: React.FC<{ 
  icon: React.ReactNode, 
  label: string, 
  value: string 
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default QualityControl;