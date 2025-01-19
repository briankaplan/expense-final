'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ExpenseTracker } from '@/components/ExpenseTracker';
import BusinessMissingReceiptsImporter from '../components/BusinessMissingReceiptsImporter';
import ReceiptFinder from '../components/ReceiptFinder';
import ReceiptViewer from '../components/ReceiptViewer';
import { AlertTriangle } from 'lucide-react';

const getReceiptUrl = (expense) => {
  if (!expense.receipt_url) return null;
  
  // If it's already a full URL, return it
  if (expense.receipt_url.startsWith('http')) {
    return expense.receipt_url;
  }
  
  // Otherwise, construct the URL using the R2_PUBLIC_URL
  return `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${expense.receipt_url}`;
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

export default function Home() {
  const [activeTab, setActiveTab] = useState('missing');
  const [expenses, setExpenses] = useState([]);
  const [importComplete, setImportComplete] = useState(false);
  const [isReceiptFinderOpen, setIsReceiptFinderOpen] = useState(false);
  const [missingReceiptExpenses, setMissingReceiptExpenses] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    // Load initial expenses
    fetchExpenses();
  }, []);

  useEffect(() => {
    // Update missing receipts list whenever expenses change
    const missing = expenses.filter(expense => !expense.receipt_url);
    setMissingReceiptExpenses(missing);
  }, [expenses]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpenses(data.expenses || []);
    } catch (error) {
      console.error('Failed to load expenses:', error);
    }
  };

  const handleImportComplete = async (result) => {
    setImportComplete(true);
    // Refresh expenses list
    await fetchExpenses();
    // Reset import complete status after 3 seconds
    setTimeout(() => {
      setImportComplete(false);
    }, 3000);
  };

  const handleReceiptFound = async (expenseId, receiptUrl) => {
    try {
      const response = await fetch(`/api/expenses/${expenseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receipt_url: receiptUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update expense');
      }

      // Refresh expenses list
      await fetchExpenses();
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
  };

  const handleUploadReceipt = (expense) => {
    setSelectedReceipt(expense);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {selectedReceipt && (
        <ReceiptViewer 
          expense={{
            ...selectedReceipt,
            receipt_url: getReceiptUrl(selectedReceipt)
          }}
          onClose={() => setSelectedReceipt(null)} 
        />
      )}
      <div className="flex">
        <Sidebar 
          expenses={expenses} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          className="w-64 fixed inset-y-0 left-0 bg-[#1a1a1a] border-r border-white/[0.06]"
        />
        <main className="flex-1 ml-64">
          <div className="p-6">
            {(activeTab === 'active' || activeTab === 'all') && (
              <ExpenseTracker 
                activeTab={activeTab}
                onExpensesChange={(updatedExpenses) => {
                  setExpenses(updatedExpenses);
                }}
              />
            )}

            {activeTab === 'missing' && (
              <>
                {/* Receipt Finder Section */}
                <div className="mb-8">
                  {isReceiptFinderOpen ? (
                    <ReceiptFinder
                      onReceiptFound={handleReceiptFound}
                      missingReceiptExpenses={missingReceiptExpenses}
                      onClose={() => setIsReceiptFinderOpen(false)}
                    />
                  ) : (
                    <button
                      onClick={() => setIsReceiptFinderOpen(true)}
                      className="px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors"
                    >
                      Open Receipt Finder
                    </button>
                  )}
                </div>

                {/* Missing Receipts List */}
                <div className="bg-[#1a1a1a] rounded-xl border border-white/[0.06]">
                  <div className="p-4 border-b border-white/[0.06]">
                    <h2 className="text-lg font-semibold text-white">Missing Receipts</h2>
                    <p className="text-sm text-gray-400 mt-1">
                      {missingReceiptExpenses.length} expenses need receipts
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/[0.06] bg-[#1a1a1a]">
                          <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Merchant</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Category</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Description</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Receipt</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {missingReceiptExpenses.map((expense) => (
                          <tr key={expense.id} className="hover:bg-white/[0.02]">
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
                              <span className="flex items-center gap-2 text-white/40">
                                <AlertTriangle className="w-4 h-4" />
                                Missing
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleUploadReceipt(expense)}
                                className="px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors text-sm"
                              >
                                Upload Receipt
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Import Section */}
            <div className="mt-8">
              <BusinessMissingReceiptsImporter onImportComplete={handleImportComplete} />
              {importComplete && (
                <div className="mt-4 p-4 bg-green-500/10 text-green-400 rounded-lg">
                  Import completed successfully! The expenses have been added to the database.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 