import React, { useState, useEffect } from 'react';
import { 
  Package, 
  AlertCircle, 
  RefreshCcw, 
  TrendingUp, 
  FileText, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  XCircle
} from 'lucide-react';
import axios from 'axios';

// Define interface for Lab Test
interface LabTest {
  _id: string;
  userId: string;  // Added userId field
  patient: {
    patientId: string;
    fullName: string;
    email: string;
  };
  tests: Array<{
    id: string;  // Changed from _id to id based on schema
    name: string;
    price: number;
  }>;
  bookingDate: string;
  bookingTime: string;
  status: string;
  totalAmount: number;
}

export function InventoryTracker() {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get(`http://localhost:3000/lab-tests/${userId}`);
        // Check if response.data.labTests exists, otherwise use response.data directly
        const testsData = response.data.labTests || response.data;
        setLabTests(testsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching lab tests:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchLabTests();
  }, []);

  // Calculate summary statistics
  const totalTests = labTests.length;
  const completedTests = labTests.filter(test => test.status === 'Completed').length;
  const cancelledTests = labTests.filter(test => test.status === 'Cancelled').length;
  const pendingTests = totalTests - completedTests - cancelledTests;

  if (loading) {
    return <div className="text-center py-10">Loading lab tests...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Lab Test Insights</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Total Spend: ₹{labTests.reduce((sum, test) => sum + test.totalAmount, 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'Total Tests', 
            value: totalTests, 
            icon: FileText, 
            color: 'text-blue-600 bg-blue-50' 
          },
          { 
            title: 'Completed Tests', 
            value: completedTests, 
            icon: CheckCircle, 
            color: 'text-green-600 bg-green-50' 
          },
          { 
            title: 'Cancelled Tests', 
            value: cancelledTests, 
            icon: XCircle, 
            color: 'text-red-600 bg-red-50' 
          }
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 ${stat.color} rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.split(' ')[0]}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Lab Tests */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-6">Recent Lab Tests</h3>
        {labTests.length === 0 ? (
          <div className="text-center text-gray-500">No lab tests found</div>
        ) : (
          <div className="space-y-4">
            {labTests.map((test) => (
              <div 
                key={test._id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-violet-50 rounded-lg">
                      <FileText className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {test.tests.map(t => t.name).join(', ')}
                      </p>
                      <p className="text-sm text-gray-500">
                        Patient: {test.patient.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(test.bookingDate).toLocaleDateString()} at {test.bookingTime}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    test.status === 'Completed' 
                      ? 'bg-green-100 text-green-800'
                      : test.status === 'Cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {test.status}
                  </span>
                  <span className="font-semibold text-violet-600">
                    ₹{test.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}