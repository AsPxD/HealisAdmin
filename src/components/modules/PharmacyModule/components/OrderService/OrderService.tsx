import React, { useState } from 'react';
import { Search, ShoppingCart, Plus, Minus, FileText, CreditCard } from 'lucide-react';
import { OrderCart } from './OrderCart';
import { ProductList } from './ProductList';
import { useInventory } from '../../hooks/useInventory';
import { InventoryItem } from '../../types';

export function OrderService() {
  const { inventory, isLoading } = useInventory();
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Array<{ item: InventoryItem; quantity: number }>>([]);

  const addToCart = (item: InventoryItem) => {
    setCart(current => {
      const existing = current.find(i => i.item.id === item.id);
      if (existing) {
        return current.map(i =>
          i.item.id === item.id
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
        if (i.item.id === itemId) {
          const newQuantity = Math.max(0, i.quantity + delta);
          return newQuantity === 0 ? null : { ...i, quantity: newQuantity };
        }
        return i;
      }).filter(Boolean) as typeof cart
    );
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {/* Product Selection */}
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
            inventory={filteredInventory}
            isLoading={isLoading}
            onAddToCart={addToCart}
            cart={cart}
          />
        </div>

        {/* Order Cart */}
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