import React, { useState, useEffect } from 'react';
import { Search, Plus, FileText, Download, X } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';

// Updated interfaces
interface Patient {
  userId: string;
  patientId: string; // Added patientId
  fullName: string;
  email: string;
}

interface Prescription {
  _id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  date: string;
  medications: string[];
  status: 'active' | 'completed' | 'cancelled';
  recommendations?: string;
  doctorId: string;
  doctorName: string;
  weight: Number;
  bloodPressure: string;
  heartRate: string;
}

const PRESCRIPTION_API_URL = 'http://localhost:8000';
const PATIENT_API_URL = 'http://localhost:3000';

export function Prescriptions() {
  // Existing state
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form state
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [medications, setMedications] = useState<string[]>(['']);
  const [recommendations, setRecommendations] = useState('');
  const [weight, setWeight] = useState<number | ''>('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [patientIdInput, setPatientIdInput] = useState('');

  // Error handling utility
  const handleApiError = (error: any, customMessage: string) => {
    console.error(`${customMessage}:`, error);
    let errorMessage = customMessage;
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    }
    toast.error(errorMessage);
    setSubmitError(errorMessage);
  };

  // Fetch patient details by PatientId
  const fetchPatientByPatientId = async (patientId: string) => {
    try {
      const response = await axios.get(`${PATIENT_API_URL}/auth/${patientId}`);
      if (response.data) {
        const patientData: Patient = {
          userId: patientId, // Using patientId as userId for consistency
          patientId: patientId,
          fullName: response.data.fullName,
          email: response.data.email
        };
        setSelectedPatient(patientData);
        // Add to patients list if not already present
        setPatients(prev => {
          const exists = prev.some(p => p.patientId === patientId);
          return exists ? prev : [...prev, patientData];
        });
      }
    } catch (error) {
      handleApiError(error, 'Failed to fetch patient details');
      setSelectedPatient(null);
    }
  };

  // Fetch prescriptions
  const fetchPrescriptions = async () => {
    try {
      const doctorId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!doctorId || !token) {
        toast.error('Authentication required');
        return;
      }

      const response = await axios.get(`${PRESCRIPTION_API_URL}/prescriptions/doctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPrescriptions(response.data);
    } catch (error) {
      handleApiError(error, 'Failed to fetch prescriptions');
    }
  };

  // Initial data fetching
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  // Form handling
  const handleAddMedication = () => {
    setMedications([...medications, '']);
  };

  const handleRemoveMedication = (index: number) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const handleMedicationChange = (index: number, value: string) => {
    const newMedications = [...medications];
    newMedications[index] = value;
    setMedications(newMedications);
  };

  const resetForm = () => {
    setShowPrescriptionForm(false);
    setSelectedPatient(null);
    setMedications(['']);
    setRecommendations('');
    setSubmitError(null);
    setWeight('');
    setBloodPressure('');
    setHeartRate('');
    setPatientIdInput('');
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!selectedPatient) {
      toast.error('Please select a patient');
      return;
    }

    const filteredMedications = medications.filter(med => med.trim() !== '');

    if (filteredMedications.length === 0) {
      toast.error('Please add at least one medication');
      return;
    }

    try {
      setLoading(true);

      const doctorId = localStorage.getItem('userId');
      const doctorName = localStorage.getItem('userName');
      const token = localStorage.getItem('token');

      if (!doctorId || !doctorName || !token) {
        throw new Error('Authentication required. Please log in again.');
      }

      const prescriptionData = {
        patientId: selectedPatient.patientId, // Using the patientId from registration
        patientName: selectedPatient.fullName,
        patientEmail: selectedPatient.email,
        medications: filteredMedications,
        recommendations: recommendations.trim(),
        doctorId,
        doctorName,
        date: new Date().toISOString(),
        status: 'active' as const,
        weight: weight || undefined,
        bloodPressure: bloodPressure || undefined,
        heartRate: heartRate || undefined
      };

      const response = await axios.post(
        `${PRESCRIPTION_API_URL}/prescriptions`,
        prescriptionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.prescription) {
        setPrescriptions(prevPrescriptions => [response.data.prescription, ...prevPrescriptions]);
        toast.success('Prescription added successfully');
        resetForm();
      } else {
        throw new Error('Invalid response from server');
      }

    } catch (error) {
      handleApiError(error, 'Failed to add prescription');
    } finally {
      setLoading(false);
    }
  };

  // Filter prescriptions based on search
  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medications.some(med => med.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Search and Add New Button */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowPrescriptionForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Prescription
        </button>
      </div>

      {/* Prescription Form Modal */}
      {showPrescriptionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Prescription</h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {submitError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient ID Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={patientIdInput}
                    onChange={(e) => setPatientIdInput(e.target.value)}
                    placeholder="Enter Patient ID (e.g., PT240001)"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => fetchPatientByPatientId(patientIdInput)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Look up
                  </button>
                </div>
              </div>

              {/* Selected Patient Info */}
              {selectedPatient && (
                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="font-medium text-blue-800">Patient Details</h3>
                  <p className="text-sm text-blue-600">Name: {selectedPatient.fullName}</p>
                  <p className="text-sm text-blue-600">Email: {selectedPatient.email}</p>
                </div>
              )}

              {/* Rest of the form remains the same */}
              {/* Medications */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Medications
                </label>
                {medications.map((medication, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={medication}
                      onChange={(e) => handleMedicationChange(index, e.target.value)}
                      placeholder="Enter medication name and dosage"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    {medications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedication(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddMedication}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add another medication
                </button>
              </div>

              {/* Health Metrics */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. 70.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Pressure
                    </label>
                    <input
                      type="text"
                      value={bloodPressure}
                      onChange={(e) => setBloodPressure(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. 118/78"
                      pattern="\d{2,3}\/\d{2,3}"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heart Rate (bpm)
                    </label>
                    <input
                      type="text"
                      value={heartRate}
                      onChange={(e) => setHeartRate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. 71bpm"
                      pattern="\d{2,3}\s*bpm"
                    />
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recommendations
                </label>
                <textarea
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter any additional recommendations or instructions..."
                />
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Prescription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Prescriptions List */}
      <div className="bg-white rounded-lg shadow">
        {filteredPrescriptions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No prescriptions found
          </div>
        ) : (
          filteredPrescriptions.map((prescription) => (
            <div key={prescription._id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{prescription.patientName}</h3>
                  <p className="text-sm text-gray-600">
                    Prescribed on {format(new Date(prescription.date), 'PPP')}
                  </p>
                  <div className="mt-2">
                    {prescription.medications.map((med, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-1"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                  {prescription.recommendations && (
                    <p className="mt-2 text-sm text-gray-600">
                      {prescription.recommendations}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                    <FileText className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-md">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Prescriptions;