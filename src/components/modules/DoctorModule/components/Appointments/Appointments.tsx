import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Video, Phone, Users, X, Search, Filter, User, MapPin, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Appointment {
  _id: string;
  patient: {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    age?: number;
    gender?: string;
  };
  doctor: {
    id: string;
    name: string;
    specialty: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  type: 'video' | 'audio' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
  reason?: string;
  medicalHistory?: string;
}

const getAppointmentTypeIcon = (type: Appointment['type']) => {
  switch (type) {
    case 'video':
      return Video;
    case 'audio':
      return Phone;
    case 'in-person':
      return Users;
    default:
      return Users;
  }
};

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Debug log for component mount
  useEffect(() => {
    console.log('Appointments component mounted');
  }, []);

  // Fetch Doctor's Appointments using axios
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get user details from localStorage
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');

        // Debug log for auth details
        console.log('Auth details:', { userId, userRole, hasToken: !!token });

        // Validate user is a doctor
        if (!userId || !token) {
          throw new Error('Missing authentication details');
        }

        if (userRole !== 'doctor') {
          throw new Error('Access denied. Only doctors can view appointments.');
        }

        // Debug log for API call
        console.log('Fetching appointments for doctor:', userId);

        // Fetch appointments for the specific doctor using axios
        const response = await axios.get(`http://localhost:3000/api/doctor-appointments/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Debug log for response
        console.log('Appointments fetched:', response.data);

        // Update appointments state
        setAppointments(response.data.appointments || []);
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

  // Handle Appointment Status Update using axios
  const handleUpdateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      await axios.patch(
        `http://localhost:3000/appointments/${appointmentId}/update-status`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Update local state
      setAppointments(prevAppointments => 
        prevAppointments.map(appt => 
          appt._id === appointmentId 
            ? { ...appt, status: status as Appointment['status'] } 
            : appt
        )
      );

      toast.success(`Appointment ${status.toLowerCase()} successfully`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update appointment status';
      console.error('Appointment status update error:', error);
      toast.error(errorMessage);
    }
  };

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter(appointment => 
    appointment.patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Base container JSX
  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          <span className="ml-2">Loading appointments...</span>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No appointments found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search appointments by patient name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Filter className="w-4 h-4 mr-2" />
              Filter Records
            </button>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 font-medium text-gray-700">
              <div>Patient Name</div>
              <div>Email</div>
              <div>Appointment Type</div>
              <div>Date & Time</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {filteredAppointments.map((appointment) => {
              const TypeIcon = getAppointmentTypeIcon(appointment.type);
              return (
                <div 
                  key={appointment._id} 
                  className={`grid grid-cols-6 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 
                    ${appointment.status === 'cancelled' ? 'opacity-50 line-through' : ''}`}
                >
                  <div>{appointment.patient.fullName}</div>
                  <div>{appointment.patient.email}</div>
                  <div className="flex items-center">
                    <TypeIcon className="w-4 h-4 mr-2" />
                    {appointment.type}
                  </div>
                  <div>{format(new Date(appointment.appointmentDate), 'PP')} at {appointment.appointmentTime}</div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${appointment.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      title="View Patient Details"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <User className="w-4 h-4" />
                    </button>
                    {appointment.status !== 'cancelled' && (
                      <button 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        onClick={() => handleUpdateAppointmentStatus(appointment._id, 'cancelled')}
                        title="Cancel Appointment"
                      >
                        <CalendarIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedAppointment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Patient Details</h2>
                  <button 
                    onClick={() => setSelectedAppointment(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Patient Details Content */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-3">
                        <User className="w-5 h-5 mr-3 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Patient Name</p>
                          <p className="font-medium">{selectedAppointment.patient.fullName}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <FileText className="w-5 h-5 mr-3 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{selectedAppointment.patient.email}</p>
                        </div>
                      </div>
                      {selectedAppointment.patient.phoneNumber && (
                        <div className="flex items-center mb-3">
                          <Phone className="w-5 h-5 mr-3 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{selectedAppointment.patient.phoneNumber}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center mb-3">
                        <CalendarIcon className="w-5 h-5 mr-3 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Appointment Date</p>
                          <p className="font-medium">{format(new Date(selectedAppointment.appointmentDate), 'PPP')}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <Clock className="w-5 h-5 mr-3 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium">{selectedAppointment.appointmentTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <MapPin className="w-5 h-5 mr-3 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Specialty</p>
                          <p className="font-medium">{selectedAppointment.doctor.specialty}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedAppointment.reason && (
                    <div className="border-t pt-4">
                      <h3 className="font-medium text-gray-900 mb-2">Reason for Visit</h3>
                      <p className="text-gray-600">{selectedAppointment.reason}</p>
                    </div>
                  )}
                  
                  {selectedAppointment.medicalHistory && (
                    <div className="border-t pt-4">
                      <h3 className="font-medium text-gray-900 mb-2">Medical History</h3>
                      <p className="text-gray-600">{selectedAppointment.medicalHistory}</p>
                    </div>
                  )}

                  <div className="border-t pt-4 flex justify-end space-x-4">
                    <button
                      onClick={() => setSelectedAppointment(null)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Appointments;