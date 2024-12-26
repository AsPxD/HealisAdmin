import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

interface MedicineInventoryItem {
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
  createdAt: string;
  updatedAt: string;
}

interface ProductListProps {
  searchQuery: string;
  cart: Array<{ item: MedicineInventoryItem; quantity: number }>;
  onAddToCart: (item: MedicineInventoryItem) => void;
}

export function ProductList({ searchQuery, cart, onAddToCart }: ProductListProps) {
  const [inventory, setInventory] = useState<MedicineInventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/inventory', {
        method: 'GET',
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
      setError(null);
    } catch (error) {
      setError('Error loading inventory. Please try again later.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.medicineUse.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCartQuantity = (itemId: string) => {
    const cartItem = cart.find(({ item }) => item._id === itemId);
    return cartItem?.quantity || 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (filteredInventory.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No medicines found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredInventory.map((item) => (
        <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{item.medicineName}</h3>
              <p className="text-sm text-gray-500">{item.companyName}</p>
              <p className="text-sm text-gray-500">Use: {item.medicineUse}</p>
              <p className="text-sm text-gray-500">Composition: {item.composition}</p>
              <div className="mt-1 text-xs text-gray-500">
                <p>Batch: {item.batchNumber}</p>
                <p>Mfg: {new Date(item.manufacturingDate).toLocaleDateString()}</p>
                <p>Exp: {new Date(item.expiryDate).toLocaleDateString()}</p>
                <p>Warehouse: {item.warehouseName}</p>
              </div>
            </div>
            <span className="text-lg font-semibold text-purple-600">
              ₹{item.price.toFixed(2)}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.stock <= 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {item.stock} in stock
              </div>
              {item.stock <= 10 && <AlertCircle className="w-4 h-4 text-red-500" />}
            </div>
            
            <div className="flex items-center space-x-2">
              {getCartQuantity(item._id) > 0 && (
                <span className="text-sm font-medium text-purple-600">
                  {getCartQuantity(item._id)} in cart
                </span>
              )}
              <button
                onClick={() => onAddToCart(item)}
                disabled={item.stock === 0}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}