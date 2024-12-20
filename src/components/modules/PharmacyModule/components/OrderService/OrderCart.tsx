import React from 'react';
import { Trash2, Plus, Minus, CreditCard, FileText, ShoppingCart } from 'lucide-react';
import { InventoryItem } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface OrderCartProps {
  cart: Array<{ item: InventoryItem; quantity: number }>;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  total: number;
}

export function OrderCart({ cart, onUpdateQuantity, total }: OrderCartProps) {
  const handleCheckout = () => {
    // In a real app, this would integrate with a payment system
    alert('Processing payment and generating bill...');
  };

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

  const tax = total * 0.1;
  const finalTotal = total + tax;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        {cart.map(({ item, quantity }) => (
          <CartItem
            key={item.id}
            item={item}
            quantity={quantity}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <OrderSummary
        subtotal={total}
        tax={tax}
        total={finalTotal}
      />

      <div className="mt-6 space-y-3">
        <button
          onClick={handleCheckout}
          className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Process Payment
        </button>
        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          <FileText className="w-4 h-4 mr-2" />
          Generate Bill
        </button>
      </div>
    </div>
  );
}

interface CartItemProps {
  item: InventoryItem;
  quantity: number;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

function CartItem({ item, quantity, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.id, -1)}
          className="p-1 text-gray-500 hover:text-red-600"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-medium">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, 1)}
          className="p-1 text-gray-500 hover:text-green-600"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="ml-4 text-right">
        <p className="font-medium">{formatCurrency(item.price * quantity)}</p>
      </div>
    </div>
  );
}

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
}

function OrderSummary({ subtotal, tax, total }: OrderSummaryProps) {
  return (
    <div className="border-t border-gray-200 pt-4 space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Tax (10%)</span>
        <span className="font-medium">{formatCurrency(tax)}</span>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}