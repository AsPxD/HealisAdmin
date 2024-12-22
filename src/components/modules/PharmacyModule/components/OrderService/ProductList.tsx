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

type CartItem = {
  item: MedicineInventoryItem;
  quantity: number;
};

export function ProductList() {
  const [inventory, setInventory] = useState<MedicineInventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory');
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

  const handleAddToCart = (item: MedicineInventoryItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.item._id === item._id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.item._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (inventory.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {inventory.map((item) => (
        <ProductCard
          key={item._id}
          item={item}
          cartQuantity={getCartQuantity(item._id, cart)}
          onAddToCart={handleAddToCart}
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

function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-red-500">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">No medicines found matching your search.</p>
    </div>
  );
}

interface ProductCardProps {
  item: MedicineInventoryItem;
  cartQuantity: number;
  onAddToCart: (item: MedicineInventoryItem) => void;
}

function ProductCard({ item, cartQuantity, onAddToCart }: ProductCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{item.medicineName}</h3>
          <p className="text-sm text-gray-500">{item.companyName}</p>
          <p className="text-sm text-gray-500">Use: {item.medicineUse}</p>
          <p className="text-sm text-gray-500">Composition: {item.composition}</p>
          <div className="mt-1 text-xs text-gray-500">
            <p>Batch: {item.batchNumber}</p>
            <p>Mfg: {formatDate(item.manufacturingDate)}</p>
            <p>Exp: {formatDate(item.expiryDate)}</p>
            <p>Warehouse: {item.warehouseName}</p>
          </div>
        </div>
        <span className="text-lg font-semibold text-purple-600">
          {formatCurrency(item.price)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <StockStatus stock={item.stock} />
        <CartActions
          itemId={item._id}
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
}

function StockStatus({ stock }: StockStatusProps) {
  const isLowStock = stock <= 10;
  
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

function getCartQuantity(itemId: string, cart: CartItem[]) {
  const cartItem = cart.find(({ item }) => item._id === itemId);
  return cartItem?.quantity || 0;
}