import React, { useState, useEffect } from 'react';
import { Network, Link, Globe, Server, PlusCircle, X, Clock,IndianRupee, FileText, Beaker, Trash2, Edit2 } from 'lucide-react';

export const LabIntegration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTest, setEditingTest] = useState(null);
  const [formData, setFormData] = useState({
    testName: '',
    price: '',
    resultTime: '',
    description: ''
  });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch('/api/lab/tests', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch tests');
      
      const data = await response.json();
      setTests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingTest 
        ? `/api/lab/tests/${editingTest._id}`
        : '/api/lab/tests';
      
      const method = editingTest ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save test');

      await fetchTests();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (testId) => {
    if (!window.confirm('Are you sure you want to delete this test?')) return;
    
    try {
      const response = await fetch(`/api/lab/tests/${testId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete test');

      await fetchTests();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (test) => {
    setEditingTest(test);
    setFormData({
      testName: test.testName,
      price: test.price.toString(),
      resultTime: test.resultTime.toString(),
      description: test.description || ''
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      testName: '',
      price: '',
      resultTime: '',
      description: ''
    });
    setEditingTest(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Lab Test Management</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add Test</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Beaker className="w-8 h-8 text-purple-600" />
            <h3 className="text-lg font-semibold">Available Tests</h3>
          </div>
          <div className="space-y-4">
            {tests.map((test) => (
              <div key={test._id} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <div>
                  <p className="font-medium text-gray-900">{test.testName}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      ${test.price}
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {test.resultTime} hours
                    </span>
                  </div>
                  {test.description && (
                    <p className="text-sm text-gray-500 mt-1">{test.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(test)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(test._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {tests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No tests available. Add your first test!
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Globe className="w-8 h-8 text-indigo-600" />
            <h3 className="text-lg font-semibold">Recent Activities</h3>
          </div>
          <div className="space-y-4">
            {tests.slice(0, 5).map((test) => (
              <div key={test._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Test Added</p>
                  <p className="text-sm text-gray-500">{test.testName}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(test.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 m-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {editingTest ? 'Edit Test' : 'Add New Test'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Name
                </label>
                <input
                  type="text"
                  name="testName"
                  value={formData.testName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter test name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">
                    <IndianRupee className="w-5 h-5" />
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Result Time (hours)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">
                    <Clock className="w-5 h-5" />
                  </span>
                  <input
                    type="number"
                    name="resultTime"
                    value={formData.resultTime}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter hours"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 h-32 resize-none"
                  placeholder="Enter test description or combination details"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                {editingTest ? 'Update Test' : 'Add Test'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabIntegration;