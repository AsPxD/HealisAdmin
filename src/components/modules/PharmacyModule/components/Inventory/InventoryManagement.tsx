import React, { useState, useEffect } from 'react';
import { Package, Plus, X } from 'lucide-react';
import { InventoryList } from './InventoryList';
import { InventoryFilters } from './InventoryFilters';

interface InventoryItem {
  _id: string;
  companyName: string;
  warehouseName: string;
  medicineName: string;
  medicineUse: string;
  composition: string;
  stock: number;
  price: number;
  expiryDate: string;
  batchNumber: string;
  manufacturingDate: string;
}

interface InventoryFilters {
  search: string;
  category: string;
  stockStatus: 'all' | 'low' | 'normal' | 'overstock';
}

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative z-50 w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

const AddInventoryForm = ({ onClose, onInventoryAdded }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    warehouseName: '',
    medicineName: '',
    medicineUse: '',
    composition: '',
    stock: '',
    price: '',
    expiryDate: '',
    batchNumber: '',
    manufacturingDate: ''
  });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }
  
        const response = await fetch('/api/inventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add inventory');
        }
  
        const savedInventory = await response.json();
        onInventoryAdded(savedInventory);
        onClose();
      } catch (error) {
        console.error('Error adding inventory:', error);
        // Handle error (show error message)
      }
    };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add New Inventory</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Warehouse Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.warehouseName}
              onChange={(e) => setFormData({...formData, warehouseName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medicine Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.medicineName}
              onChange={(e) => setFormData({...formData, medicineName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Use of Medicine *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.medicineUse}
              onChange={(e) => setFormData({...formData, medicineUse: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Composition
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.composition}
              onChange={(e) => setFormData({...formData, composition: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch Number *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.batchNumber}
              onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock *
            </label>
            <input
              type="number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price *
            </label>
            <input
              type="number"
              step="0.01"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Manufacturing Date *
            </label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.manufacturingDate}
              onChange={(e) => setFormData({...formData, manufacturingDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date *
            </label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.expiryDate}
              onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Add Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

export function InventoryManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<InventoryFilters>({
    search: '',
    category: 'all',
    stockStatus: 'all'
  });
  
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }
  
        const searchParams = new URLSearchParams();
        if (filters.search) {
          searchParams.append('medicineName', filters.search);
        }
  
        const response = await fetch(`/api/inventory?${searchParams.toString()}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }
        
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        // Handle error (e.g., redirect to login, show error message)
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchInventory();
  }, [filters]);

  const handleInventoryAdded = (newItem: InventoryItem) => {
    setInventory(prev => [newItem, ...prev]);
  };

  const handleFilterChange = (newFilters: InventoryFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <Plus className="w-4 h-4" />
            <span>Add Inventory</span>
          </button>
        </div>
      </div>

      <InventoryFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <InventoryList 
        inventory={inventory}
        isLoading={isLoading}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddInventoryForm 
          onClose={() => setIsOpen(false)} 
          onInventoryAdded={handleInventoryAdded}
        />
      </Modal>
    </div>
  );
}

export default InventoryManagement;