import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { InventoryItem } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ProductListProps {
  inventory: InventoryItem[];
  isLoading: boolean;
  onAddToCart: (item: InventoryItem) => void;
  cart: Array<{ item: InventoryItem; quantity: number }>;
}

export function ProductList({ inventory, isLoading, onAddToCart, cart }: ProductListProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (inventory.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {inventory.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          cartQuantity={getCartQuantity(item.id, cart)}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">No products found matching your search.</p>
    </div>
  );
}

interface ProductCardProps {
  item: InventoryItem;
  cartQuantity: number;
  onAddToCart: (item: InventoryItem) => void;
}

function ProductCard({ item, cartQuantity, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.category}</p>
        </div>
        <span className="text-lg font-semibold text-purple-600">
          {formatCurrency(item.price)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <StockStatus stock={item.stock} minStock={item.minStock} />
        <CartActions
          itemId={item.id}
          stock={item.stock}
          cartQuantity={cartQuantity}
          onAddToCart={() => onAddToCart(item)}
        />
      </div>
    </div>
  );
}

interface StockStatusProps {
  stock: number;
  minStock: number;
}

function StockStatus({ stock, minStock }: StockStatusProps) {
  const isLowStock = stock <= minStock;
  
  return (
    <div className="flex items-center space-x-2">
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
        isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
      }`}>
        {stock} in stock
      </div>
      {isLowStock && <AlertCircle className="w-4 h-4 text-red-500" />}
    </div>
  );
}

interface CartActionsProps {
  itemId: string;
  stock: number;
  cartQuantity: number;
  onAddToCart: () => void;
}

function CartActions({ stock, cartQuantity, onAddToCart }: CartActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      {cartQuantity > 0 && (
        <span className="text-sm font-medium text-purple-600">
          {cartQuantity} in cart
        </span>
      )}
      <button
        onClick={onAddToCart}
        disabled={stock === 0}
        className="p-2 text-purple-600 hover:bg-purple-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}

function getCartQuantity(itemId: string, cart: Array<{ item: InventoryItem; quantity: number }>) {
  const cartItem = cart.find(({ item }) => item.id === itemId);
  return cartItem?.quantity || 0;
}