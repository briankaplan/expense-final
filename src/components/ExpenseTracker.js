'use client';

import React, { useState, useEffect } from 'react';
import { Receipt, AlertCircle, ArrowUpDown, CheckCircle, Search, Filter, Edit2, AlertTriangle, Tag } from 'lucide-react';
import ReceiptFinder from './ReceiptFinder';
import ReceiptViewer from './ReceiptViewer';

const getReceiptUrl = (expense) => {
  if (!expense.receipt_url) return null;
  
  // If it's already a full URL, return it
  if (expense.receipt_url.startsWith('http')) {
    return expense.receipt_url;
  }
  
  // Otherwise, construct the URL using the R2_PUBLIC_URL
  return `${process.env.R2_PUBLIC_URL}/${expense.receipt_url}`;
};

const formatDate = (dateString) => {
  if (!dateString) return '—';
  
  try {
    // First try parsing as ISO string
    let date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      // Try parsing YY-MM-DD format (e.g., "24-07-15")
      if (dateString.match(/^\d{2}-\d{2}-\d{2}$/)) {
        const [yy, mm, dd] = dateString.split('-');
        date = new Date(2000 + parseInt(yy), parseInt(mm) - 1, parseInt(dd));
      } else {
        // Try parsing MM/DD/YYYY format
        const parts = dateString.split('/');
        if (parts.length === 3) {
          date = new Date(parts[2], parts[0] - 1, parts[1]);
        }
      }
    }
    
    // If we have a valid date, format it consistently
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // If all parsing fails, return the original string
    return dateString;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export function ExpenseTracker({ activeTab, onExpensesChange }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'transaction_date', direction: 'desc' });
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    // Auto-run categorization when on active tab and expenses are loaded
    if (activeTab === 'active' && !loading && expenses.length > 0) {
      handleCategorize();
    }
  }, [activeTab, loading, expenses.length]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      const expensesData = data.expenses || [];
      setExpenses(expensesData);
      onExpensesChange?.(expensesData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/expenses/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expenseIds: selectedExpenses })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit expenses');
      }
      
      await fetchExpenses();
      setSelectedExpenses([]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateExpense = async (expenseId, updates) => {
    try {
      const response = await fetch(`/api/expenses/${expenseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update expense');
      }
      
      await fetchExpenses();
      setEditingExpense(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelectExpense = (expenseId) => {
    setSelectedExpenses(prev => 
      prev.includes(expenseId) 
        ? prev.filter(id => id !== expenseId)
        : [...prev, expenseId]
    );
  };

  const handleSelectAll = () => {
    if (selectedExpenses.length === filteredExpenses.length) {
      setSelectedExpenses([]);
    } else {
      setSelectedExpenses(filteredExpenses.map(expense => expense.id));
    }
  };

  const handleCategorize = async () => {
    try {
      const response = await fetch('/api/update-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to categorize expenses');
      }
      
      await fetchExpenses();
    } catch (error) {
      setError(error.message);
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortConfig.key === 'amount') {
      return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    if (sortConfig.key === 'transaction_date') {
      return sortConfig.direction === 'asc' 
        ? new Date(a.transaction_date) - new Date(b.transaction_date)
        : new Date(b.transaction_date) - new Date(a.transaction_date);
    }
    return 0;
  });

  const filteredExpenses = sortedExpenses
    .filter(expense => {
      // First filter by tab
      const tabFilter = (() => {
        switch (activeTab) {
          case 'active':
            return expense.receipt_url && !expense.submitted;
          case 'missing':
            return !expense.receipt_url;
          case 'submitted':
            return expense.submitted;
          default:
            return true;
        }
      })();

      // Then filter by search query
      if (!searchQuery) return tabFilter;
      
      const query = searchQuery.toLowerCase();
      const searchableFields = [
        expense.description,
        expense.merchant,
        expense.category,
        expense.memo,
        expense.comment,
        expense.category_details,
        // Convert amount to string for searching
        expense.amount?.toString(),
        // Format amount as currency for searching (e.g., "21.00")
        expense.amount?.toFixed(2),
      ];
      
      // Check if any field contains the search query
      return tabFilter && searchableFields.some(field => 
        field?.toLowerCase().includes(query)
      );
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case 'active':
        return 'Active Expenses';
      case 'missing':
        return 'Missing Receipts';
      case 'submitted':
        return 'Submitted Expenses';
      default:
        return 'All Expenses';
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {selectedReceipt && (
        <ReceiptViewer 
          expense={{
            ...selectedReceipt,
            receipt_url: getReceiptUrl(selectedReceipt)
          }}
          onClose={() => setSelectedReceipt(null)} 
        />
      )}
      
      <div className="flex-none p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">{getTabTitle()}</h1>
          <div className="flex items-center gap-2">
            {activeTab === 'active' && selectedExpenses.length > 0 && (
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DB954] text-black font-medium hover:bg-[#1ed760] transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Submit Selected ({selectedExpenses.length})
              </button>
            )}
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-lg bg-[#282828] border border-white/[0.06] text-white/80 placeholder-white/40 focus:outline-none focus:border-[#1DB954] transition-colors"
          />
        </div>

        {activeTab === 'missing' && (
          <div className="mb-6">
            <ReceiptFinder expenses={filteredExpenses} onUpdate={handleUpdateExpense} />
          </div>
        )}
      </div>

      <div className="flex-1 px-6 pb-6 -mt-6">
        <div className="h-full rounded-lg overflow-hidden bg-[#282828] border border-white/[0.06]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#1a1a1a]">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedExpenses.length === filteredExpenses.length}
                      onChange={handleSelectAll}
                      className="rounded border-white/20 bg-transparent checked:bg-[#1DB954] checked:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954]"
                    />
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button 
                      className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
                      onClick={() => handleSort('transaction_date')}
                    >
                      Date
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Merchant</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Receipt</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredExpenses.map((expense) => (
                  <tr 
                    key={expense.id} 
                    className="hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedExpenses.includes(expense.id)}
                        onChange={() => handleSelectExpense(expense.id)}
                        className="rounded border-white/20 bg-transparent checked:bg-[#1DB954] checked:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954]"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatDate(expense.transaction_date)}
                    </td>
                    <td className="px-6 py-4 text-sm">{expense.merchant || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${Math.abs(expense.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {expense.category || '—'}
                        {expense.categorization_confidence < 0.5 && (
                          <span title="Low Confidence" className="text-yellow-500">
                            <AlertTriangle className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      {expense.category_details && (
                        <span className="text-xs text-white/40">{expense.category_details}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">{expense.description || '—'}</td>
                    <td className="px-6 py-4">
                      {expense.receipt_url ? (
                        <button
                          onClick={() => setSelectedReceipt(expense)}
                          className="flex items-center gap-2 text-[#1DB954] hover:text-[#1ed760] transition-colors"
                        >
                          <Receipt className="w-4 h-4" />
                          View
                        </button>
                      ) : (
                        <span className="flex items-center gap-2 text-white/40">
                          <AlertTriangle className="w-4 h-4" />
                          Missing
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleUpdateExpense(expense.id, { comment: 'Edited from table' })}
                        className="p-2 hover:bg-white/[0.06] rounded-md transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-white/60" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 