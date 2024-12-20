import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, Calendar, Clock, MapPin, User, X } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

// Enhanced Appointment Interface
interface Appointment {
  _id: string;
  patient: {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
  };
  doctor: {
    id: string;
    name: string;
    specialty: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  status?: string;
}

export function PatientRecords() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Doctor's Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Get user details from localStorage
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');

        // Validate user is a doctor
        if (!userId || userRole !== 'doctor') {
          toast.error('Access denied. Only doctors can view appointments.');
          setLoading(false);
          return;
        }

        // Fetch appointments for the specific doctor
        const response = await axios.get(`http://localhost:3000/api/doctor-appointments/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Update appointments state
        setAppointments(response.data.appointments || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments', error);
        toast.error('Failed to load appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter Appointments
  const filteredAppointments = appointments.filter(appointment => 
    appointment.patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Appointment Status Update
  const handleUpdateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      await axios.patch(`http://localhost:3000/appointments/${appointmentId}/update-status`, 
        { status },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update local state
      setAppointments(prevAppointments => 
        prevAppointments.map(appt => 
          appt._id === appointmentId 
            ? { ...appt, status } 
            : appt
        )
      );

      toast.success(`Appointment ${status.toLowerCase()} successfully`);
    } catch (error) {
      console.error('Appointment status update error', error);
      toast.error('Failed to update appointment status');
    }
  };

  // View Patient Details
  const handleViewPatientDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Render when no appointments
  if (appointments.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No appointments found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
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

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 font-medium text-gray-700">
          <div>Patient Name</div>
          <div>Email</div>
          <div>Specialty</div>
          <div>Appointment Date</div>
          <div>Appointment Time</div>
          <div>Actions</div>
        </div>
        {filteredAppointments.map((appointment) => (
          <div 
            key={appointment._id} 
            className={`grid grid-cols-6 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 
              ${appointment.status === 'Cancelled' ? 'opacity-50 line-through' : ''}`}
          >
            <div>{appointment.patient.fullName}</div>
            <div>{appointment.patient.email}</div>
            <div>{appointment.doctor.specialty}</div>
            <div>{format(new Date(appointment.appointmentDate), 'PP')}</div>
            <div>{appointment.appointmentTime}</div>
            <div className="flex space-x-2">
              <button 
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                title="View Patient Details"
                onClick={() => handleViewPatientDetails(appointment)}
              >
                <User className="w-4 h-4" />
              </button>
              {appointment.status !== 'Cancelled' && (
                <button 
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  onClick={() => handleUpdateAppointmentStatus(appointment._id, 'Cancelled')}
                  title="Cancel Appointment"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Patient Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Patient Details</h2>
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-3 text-gray-600" />
                <span className="font-medium">{selectedAppointment.patient.fullName}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-gray-600" />
                <span>{format(new Date(selectedAppointment.appointmentDate), 'PPP')} at {selectedAppointment.appointmentTime}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-gray-600" />
                <span>{selectedAppointment.doctor.specialty}</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-3 text-gray-600" />
                <span>{selectedAppointment.patient.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientRecords;