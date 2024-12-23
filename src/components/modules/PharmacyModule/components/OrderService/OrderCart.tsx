import React, { useState } from 'react';
import { Minus, Plus, CreditCard, FileText, ShoppingCart, X } from 'lucide-react';

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

interface OrderCartProps {
  cart: Array<{ item: MedicineInventoryItem; quantity: number }>;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  total: number;
  onOrderComplete?: () => void;
}

interface PatientDetails {
  name: string;
  email: string;
  phone: string;
  patientId: string;
}

export function OrderCart({ cart, onUpdateQuantity, total, onOrderComplete }: OrderCartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    name: '',
    email: '',
    phone: '',
    patientId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProcessPayment = async () => {
    // Reset error state
    setError(null);

    // Validate required fields
    if (!patientDetails.name || !patientDetails.email || !patientDetails.phone) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const tax = total * 0.1;
      const finalTotal = total + tax;

      // Prepare medicine data in the format expected by the API
      const medicinesData = cart.map(({ item, quantity }) => ({
        medicineId: item._id,
        medicineName: item.medicineName,
        companyName: item.companyName,
        medicineUse: item.medicineUse,
        composition: item.composition,
        batchNumber: item.batchNumber,
        manufacturingDate: item.manufacturingDate,
        expiryDate: item.expiryDate,
        warehouseName: item.warehouseName,
        quantity: quantity,
        pricePerUnit: item.price,
        totalPrice: item.price * quantity
      }));

      const response = await fetch('/api/billing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientDetails,
          medicines: medicinesData,
          billing: {
            subtotal: total,
            tax: tax,
            totalAmount: finalTotal
          },
          paymentMethod: 'card' // You can modify this based on your requirements
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to process payment');
      }

      // Success handling
      alert('Payment processed successfully!');
      setIsModalOpen(false);
      if (onOrderComplete) {
        onOrderComplete();
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the payment');
    } finally {
      setIsLoading(false);
    }
  };

  const tax = total * 0.1;
  const finalTotal = total + tax;

  if (cart.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500">Add items to get started</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        
        <div className="space-y-4 mb-6">
          {cart.map(({ item, quantity }) => (
            <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.medicineName}</h4>
                <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateQuantity(item._id, -1)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item._id, 1)}
                  className="p-1 text-gray-500 hover:text-green-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="ml-4 text-right">
                <p className="font-medium">₹{(item.price * quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-medium">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center bg-purple-600 justify-center text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-purple-700"
          >
            <FileText className="w-4 h-4 mr-2 text-white" />
            Generate Bill
          </button>
        </div>
      </div>

      {/* Bill Summary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Bill Summary</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Patient Details Form */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Patient Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={patientDetails.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={patientDetails.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={patientDetails.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient ID (Optional)
                    </label>
                    <input
                      type="text"
                      name="patientId"
                      value={patientDetails.patientId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Medicine Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Medicine Details</h3>
                <div className="space-y-4">
                  {cart.map(({ item, quantity }) => (
                    <div key={item._id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.medicineName}</h4>
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
                        <div className="text-right">
                          <p className="font-medium">₹{item.price.toFixed(2)} × {quantity}</p>
                          <p className="font-bold">₹{(item.price * quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Summary */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Process Payment Button */}
              <button
                onClick={handleProcessPayment}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-5 h-5" />
                <span>{isLoading ? 'Processing...' : 'Process Payment'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}