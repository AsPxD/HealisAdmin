import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { OrderCart } from './OrderCart';
import { ProductList } from './ProductList';

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

export function OrderService() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Array<{ item: MedicineInventoryItem; quantity: number }>>([]);

  const addToCart = (item: MedicineInventoryItem) => {
    setCart(current => {
      const existing = current.find(i => i.item._id === item._id);
      if (existing) {
        return current.map(i =>
          i.item._id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...current, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(current =>
      current.map(i => {
        if (i.item._id === itemId) {
          const newQuantity = Math.max(0, i.quantity + delta);
          return newQuantity === 0 ? null : { ...i, quantity: newQuantity };
        }
        return i;
      }).filter(Boolean) as typeof cart
    );
  };

  const calculateTotal = () => {
    return cart.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Order Service</h2>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">
            {cart.length} Items in Cart
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines by name or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <ProductList
            searchQuery={searchQuery}
            onAddToCart={addToCart}
            cart={cart}
          />
        </div>

        <div className="lg:col-span-1">
          <OrderCart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            total={calculateTotal()}
          />
        </div>
      </div>
    </div>
  );
}
