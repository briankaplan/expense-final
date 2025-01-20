'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ExpenseTracker } from '@/components/ExpenseTracker';
import BusinessMissingReceiptsImporter from '../components/BusinessMissingReceiptsImporter';
import ReceiptFinder from '../components/ReceiptFinder';
import ReceiptViewer from '../components/ReceiptViewer';
import ReceiptUploader from '../components/ReceiptUploader';
import { AlertTriangle, Check, X } from 'lucide-react';

const getReceiptUrl = (expense) => {
  if (!expense.receipt_url) return null;
  
  // If it's already a full URL, return it
  if (expense.receipt_url.startsWith('http')) {
    // For PDFs, ensure we're using https
    if (expense.receipt_url.toLowerCase().endsWith('.pdf') && expense.receipt_url.startsWith('http://')) {
      return expense.receipt_url.replace('http://', 'https://');
    }
    return expense.receipt_url;
  }
  
  // Otherwise, construct the URL using the R2_PUBLIC_URL
  const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, ''); // Remove trailing slash if present
  const receiptPath = expense.receipt_url.startsWith('/') ? expense.receipt_url.slice(1) : expense.receipt_url;
  const url = `${baseUrl}/${receiptPath}`;
  
  // For PDFs, ensure we're using https
  if (url.toLowerCase().endsWith('.pdf') && url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  
  return url;
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
  const [editingExpense, setEditingExpense] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [uploadingReceipt, setUploadingReceipt] = useState(null);

  const getViewTitle = () => {
    switch (activeTab) {
      case 'all':
        return 'All Expenses';
      case 'active':
        return 'Active Expenses';
      case 'missing':
        return 'Missing Receipts';
      case 'submitted':
        return 'Submitted Expenses';
      default:
        return 'Expenses';
    }
  };

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
    setUploadingReceipt(expense);
  };

  const handleUploadComplete = async (receiptUrl) => {
    try {
      const response = await fetch(`/api/expenses/${uploadingReceipt.id}`, {
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
      setUploadingReceipt(null);
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
  };

  const handleStartEdit = (expense) => {
    setEditingExpense(expense);
    setEditValue(expense.description || '');
  };

  const handleSaveDescription = async (expenseId) => {
    try {
      const response = await fetch(`/api/expenses/${expenseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: editValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update description');
      }

      // Update local state
      setExpenses(expenses.map(exp => 
        exp.id === expenseId 
          ? { ...exp, description: editValue }
          : exp
      ));

      // Clear editing state
      setEditingExpense(null);
      setEditValue('');
    } catch (error) {
      console.error('Failed to update description:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setEditValue('');
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        expenses={expenses}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="w-[280px] shrink-0 border-r border-border"
      />
      
      <main className="main-container">
        <div className="content-container">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{getViewTitle()}</h1>
            {activeTab === 'missing' && (
              <button
                onClick={() => setIsReceiptFinderOpen(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Open Receipt Finder
              </button>
            )}
          </div>

          {selectedReceipt && (
            <ReceiptViewer 
              expense={{
                ...selectedReceipt,
                receipt_url: getReceiptUrl(selectedReceipt)
              }}
              onClose={() => setSelectedReceipt(null)} 
            />
          )}

          {activeTab === 'missing' && isReceiptFinderOpen && (
            <div className="mb-8">
              <ReceiptFinder
                onReceiptFound={handleReceiptFound}
                missingReceiptExpenses={missingReceiptExpenses}
                onClose={() => setIsReceiptFinderOpen(false)}
              />
            </div>
          )}

          {uploadingReceipt && (
            <ReceiptUploader
              expense={uploadingReceipt}
              onClose={() => setUploadingReceipt(null)}
              onUploadComplete={handleUploadComplete}
            />
          )}

          <div className="table-container">
            {activeTab === 'missing' ? (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Merchant</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Receipt</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {missingReceiptExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{formatDate(expense.transaction_date)}</td>
                      <td>{expense.merchant || '—'}</td>
                      <td className="text-right">
                        <span className={expense.amount < 0 ? 'expense-amount-negative' : 'expense-amount-positive'}>
                          ${Math.abs(expense.amount).toFixed(2)}
                        </span>
                      </td>
                      <td>{expense.category || '—'}</td>
                      <td className="description">
                        {editingExpense?.id === expense.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="flex-1 px-2 py-1 text-sm rounded border border-input bg-background"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveDescription(expense.id);
                                } else if (e.key === 'Escape') {
                                  handleCancelEdit();
                                }
                              }}
                            />
                            <button
                              onClick={() => handleSaveDescription(expense.id)}
                              className="p-1 hover:bg-secondary rounded"
                            >
                              <Check className="w-4 h-4 text-success" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-1 hover:bg-secondary rounded"
                            >
                              <X className="w-4 h-4 text-destructive" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(expense)}
                            className="w-full text-left hover:bg-secondary/50 px-2 py-1 rounded -mx-2"
                          >
                            {expense.description || '—'}
                          </button>
                        )}
                      </td>
                      <td className="text-center">
                        <span className="status-badge status-badge-error">
                          <AlertTriangle className="w-3 h-3" />
                          Missing
                        </span>
                      </td>
                      <td className="text-right">
                        <button
                          onClick={() => handleUploadReceipt(expense)}
                          className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 transition-colors"
                        >
                          Upload
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <ExpenseTracker 
                activeTab={activeTab}
                onExpensesChange={setExpenses}
              />
            )}
          </div>

          {/* Import Section */}
          <div className="mt-8">
            <BusinessMissingReceiptsImporter onImportComplete={handleImportComplete} />
            {importComplete && (
              <div className="mt-4 p-4 bg-success/10 text-success rounded-lg border border-success/20">
                Import completed successfully! The expenses have been added to the database.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 