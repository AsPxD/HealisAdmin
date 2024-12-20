import React, { useState } from 'react';
import { Receipt, History, Search, Filter, Download, Printer } from 'lucide-react';
import { BillingForm } from './BillingForm';
import { BillingHistory } from './BillingHistory';
import { useBillingHistory } from '../../hooks/useBillingHistory';

export function BillingSystem() {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const { bills, isLoading } = useBillingHistory();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Pharmacy Billing</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'new'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            <Receipt className="w-4 h-4 mr-2" />
            New Bill
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'history'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            <History className="w-4 h-4 mr-2" />
            History
          </button>
        </div>
      </div>

      {activeTab === 'new' ? (
        <BillingForm />
      ) : (
        <BillingHistory bills={bills} isLoading={isLoading} />
      )}
    </div>
  );
}