import React, { useState } from 'react';
import { Plus, Minus, Trash2, Calculator } from 'lucide-react';
import { useBilling } from '../../hooks/useBilling';
import { BillItem, PaymentMethod } from '../../types/billing';
import { formatCurrency } from '../../utils/formatters';

export function BillingForm() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    generateBill,
  } = useBilling();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateBill({
      items,
      paymentMethod,
      customerInfo,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <input
            type="email"
            placeholder="Email (Optional)"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Bill Items</h3>
          <button
            type="button"
            onClick={() => addItem()}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <select
                value={item.id}
                onChange={(e) => updateQuantity(index, { ...item, id: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Medicine</option>
                {/* Add your medicine options here */}
              </select>
              
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(index, { ...item, quantity: item.quantity - 1 })}
                  className="p-2 text-gray-500 hover:text-red-600"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(index, { ...item, quantity: parseInt(e.target.value) })}
                  className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="1"
                />
                <button
                  type="button"
                  onClick={() => updateQuantity(index, { ...item, quantity: item.quantity + 1 })}
                  className="p-2 text-gray-500 hover:text-green-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="w-32 text-right font-medium">
                {formatCurrency(item.price * item.quantity)}
              </div>

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-2 text-gray-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="insurance">Insurance</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="font-medium">{formatCurrency(calculateTax())}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          type="submit"
          className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Generate Bill
        </button>
      </div>
    </form>
  );
}