import React, { useState } from 'react';
import { Search, User, Clock, FileText, Mail, Phone, Heart, X, Calendar } from 'lucide-react';

export const PatientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState('');
  const [patientHistory, setPatientHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  // Previous handlers remain the same...
  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:3000/auth/${searchTerm}`);
      const data = await response.json();
      if (data.fullName) {
        setPatientData(data);
      } else {
        setError('Patient not found');
        setPatientData(null);
      }
    } catch (err) {
      setError('Error searching for patient');
      setPatientData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!patientData) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          email: patientData.email
        })
      });
      if (response.ok) {
        setShowOtpDialog(true);
        setVerificationStatus('OTP sent successfully');
      } else {
        setError('Failed to send OTP');
      }
    } catch (err) {
      setError('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !patientData) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          email: patientData.email,
          otp
        })
      });
      
      if (response.ok) {
        // Fetch patient history from both prescription and registration data
        const [prescriptionRes, metricsRes] = await Promise.all([
          fetch(`http://localhost:8000/prescriptions/patient/${searchTerm}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }),
          fetch(`http://localhost:8000/api/patient-health-metrics/${searchTerm}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          })
        ]);
        
        const [prescriptions, metrics] = await Promise.all([
          prescriptionRes.json(),
          metricsRes.json()
        ]);
        
        setPatientHistory({ prescriptions, metrics });
        setShowOtpDialog(false);
        setVerificationStatus('verified');
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  // Timeline component for prescriptions
  const PrescriptionTimeline = ({ prescriptions }) => {
    return (
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gray-200">
        {prescriptions?.map((prescription, index) => (
          <div key={index} className="relative flex gap-6 pb-8">
            <div className="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex-1 ml-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dr. {prescription.doctorName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(prescription.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  prescription.status === 'active' ? 'bg-green-100 text-green-800' :
                  prescription.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {prescription.status}
                </span>
              </div>

              <div className="space-y-4">
                {/* Health Metrics */}
                {(prescription.weight || prescription.bloodPressure || prescription.heartRate) && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    {prescription.weight && (
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="font-medium">{prescription.weight} kg</p>
                      </div>
                    )}
                    {prescription.bloodPressure && (
                      <div>
                        <p className="text-sm text-gray-500">Blood Pressure</p>
                        <p className="font-medium">{prescription.bloodPressure}</p>
                      </div>
                    )}
                    {prescription.heartRate && (
                      <div>
                        <p className="text-sm text-gray-500">Heart Rate</p>
                        <p className="font-medium">{prescription.heartRate}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Medications */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Medications</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {prescription.medications.map((med, idx) => (
                      <li key={idx} className="text-gray-600">{med}</li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                {prescription.recommendations && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                    <p className="text-gray-600">{prescription.recommendations}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Section - remains the same */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patient by ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Patient Card - remains the same */}
      {patientData && (
        <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5" />
              Patient Information
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span>{patientData.fullName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{patientData.email}</span>
            </div>
            {verificationStatus !== 'verified' && (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                Verify Patient Identity
              </button>
            )}
          </div>
        </div>
      )}

      {/* OTP Dialog - remains the same */}
      {showOtpDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Enter Verification Code</h3>
              <button 
                onClick={() => setShowOtpDialog(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </div>
      )}

      {/* Patient History with Timeline */}
      {patientHistory && (
        <div className="space-y-8">
          {/* Health Metrics Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Health Metrics Overview
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {patientHistory.metrics.slice(-3).map((metric, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(metric.date).toLocaleDateString()}
                  </p>
                  <div className="space-y-2">
                    {metric.weight && (
                      <p className="text-sm">Weight: <span className="font-medium">{metric.weight} kg</span></p>
                    )}
                    {metric.bloodPressure && (
                      <p className="text-sm">BP: <span className="font-medium">{metric.bloodPressure}</span></p>
                    )}
                    {metric.heartRate && (
                      <p className="text-sm">HR: <span className="font-medium">{metric.heartRate}</span></p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptions Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Prescription History
            </h2>
            <PrescriptionTimeline prescriptions={patientHistory.prescriptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSearch;