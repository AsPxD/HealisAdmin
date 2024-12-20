import React, { useState, useEffect } from 'react';
import { Video, Users, Phone } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Appointment {
  _id: string;
  patient: {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  type: 'video' | 'in-person' | 'audio';
  status: 'completed' | 'in-progress' | 'upcoming';
  duration: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video':
      return Video;
    case 'audio':
      return Phone;
    default:
      return Users;
  }
};

const formatDateTime = (date: string, time: string): string => {
  try {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Convert time to 12-hour format
    const timeObj = new Date(`2000-01-01 ${time}`);
    const formattedTime = timeObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${formattedDate} at ${formattedTime}`;
  } catch (error) {
    console.error('Date formatting error:', error);
    return `${date} ${time}`; // Fallback
  }
};

export function AppointmentTimeline() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');

        if (!userId || !token) {
          throw new Error('Missing authentication details');
        }

        if (userRole !== 'doctor') {
          throw new Error('Access denied. Only doctors can view appointments.');
        }

        const response = await axios.get(`http://localhost:3000/api/doctor-appointments/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Sort appointments by date and time
        const sortedAppointments = response.data.appointments.sort((a: Appointment, b: Appointment) => {
          const dateTimeA = new Date(`${a.appointmentDate} ${a.appointmentTime}`).getTime();
          const dateTimeB = new Date(`${b.appointmentDate} ${b.appointmentTime}`).getTime();
          return dateTimeA - dateTimeB;
        });

        setAppointments(sortedAppointments);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch appointments';
        console.error('Error fetching appointments:', error);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Appointment Timeline</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          <span className="ml-2">Loading appointments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Appointment Timeline</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Appointment Timeline</h2>
        <div className="text-center py-10">
          <p className="text-gray-500">No appointments found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Appointment Timeline</h2>
      
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gray-200" />
        
        <div className="space-y-8">
          {appointments.map((appointment) => {
            const Icon = getTypeIcon(appointment.type);
            const formattedDateTime = formatDateTime(
              appointment.appointmentDate,
              appointment.appointmentTime
            );
            
            return (
              <div key={appointment._id} className="relative flex items-start space-x-4">
                <div className="relative">
                  <div className={`absolute -left-2 w-4 h-4 rounded-full border-2 border-white ${
                    appointment.status === 'completed' ? 'bg-green-500' :
                    appointment.status === 'in-progress' ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`} />
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-lg">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {appointment.patient.fullName}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {formattedDateTime}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AppointmentTimeline;