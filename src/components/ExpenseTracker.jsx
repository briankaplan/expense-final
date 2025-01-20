'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Menu,
  CreditCard,
  FileText,
  Receipt,
  CheckCircle,
  AlertCircle,
  RefreshCcw,
  X,
  Download,
  Upload,
  Trash2,
  XCircle,
  Archive,
  Check,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileSearch from './MobileSearch';
import MobileFilters from './MobileFilters';
import ReceiptCell from './ReceiptCell';
import ReceiptModalContent from './ReceiptModalContent';
import CSVUploader from './CSVUploader';
import ReceiptFinder from './ReceiptFinder';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import ExpenseList from './ExpenseList';

const ExpenseTracker = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('active');
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'transaction_date', direction: 'desc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'all',
    category: 'all',
    amount: 'all'
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [submittedExpenses, setSubmittedExpenses] = useState(new Set());
  const [showUploader, setShowUploader] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [completedReports, setCompletedReports] = useState([]);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [expandedReport, setExpandedReport] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [updatedExpenses, setUpdatedExpenses] = useState([]);

  // Fetch expenses from API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/expenses');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch expenses');
        }
        const data = await response.json();
        console.log('Fetched expenses:', data);
        
        if (!data.success || !data.expenses || !Array.isArray(data.expenses)) {
          throw new Error('Invalid response format');
        }
        setExpenses(data.expenses);
        setUpdatedExpenses(data.expenses);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Filter expenses based on current view and search/filters
  const filteredExpenses = expenses.filter(expense => {
    if (currentView === 'active') {
      return !submittedExpenses.has(expense.id) && expense.receipt_url;
    }
    if (currentView === 'submitted') {
      return submittedExpenses.has(expense.id);
    }
    if (currentView === 'missing') {
      return !expense.receipt_url;
    }
    if (currentView === 'completed') {
      return expense.completed;
    }
    return true;
  });

  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Calculate totals
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const missingReceipts = expenses.filter(e => !e.receipt_url).length;

  const missingReceiptExpenses = updatedExpenses.filter(expense => !expense.receipt_url);
  const hasReceiptExpenses = updatedExpenses.filter(expense => expense.receipt_url);

  // Handle receipt upload
  const handleReceiptDrop = async (files) => {
    if (!selectedExpense || !files.length) return;

    try {
      setUploadingReceipt(true);
      const formData = new FormData();
      formData.append('receipt', files[0]);
      formData.append('expenseId', selectedExpense.id);
      
      const response = await fetch(`/api/receipts`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload receipt');
      
      const { url: receipt_url } = await response.json();
      
      // Update the expense in state
      setExpenses(expenses.map(e => 
        e.id === selectedExpense.id 
          ? { ...e, receipt_url } 
          : e
      ));
      
      setShowReceiptModal(false);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload receipt');
    } finally {
      setUploadingReceipt(false);
    }
  };

  // Add function to handle description updates
  const handleDescriptionUpdate = async (expenseId, newDescription) => {
    try {
      const response = await fetch(`/api/expenses/${expenseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newDescription }),
      });

      if (!response.ok) throw new Error('Failed to update description');

      setExpenses(expenses.map(expense => 
        expense.id === expenseId 
          ? { ...expense, description: newDescription }
          : expense
      ));
      setEditingExpense(null);
    } catch (error) {
      console.error('Update error:', error);
      setError('Failed to update description');
    }
  };

  // Handle submission toggle
  const toggleSubmission = async (expenseId) => {
    try {
      const newSubmittedExpenses = new Set(submittedExpenses);
      if (submittedExpenses.has(expenseId)) {
        newSubmittedExpenses.delete(expenseId);
      } else {
        newSubmittedExpenses.add(expenseId);
      }
      setSubmittedExpenses(newSubmittedExpenses);
      
      // Update the expense status in the database
      await fetch(`/api/expenses/${expenseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submitted: !submittedExpenses.has(expenseId)
        })
      });
    } catch (error) {
      console.error('Error toggling submission:', error);
      setError('Failed to update expense submission status');
    }
  };

  // Handle select all toggle
  const handleSelectAll = (checked) => {
    if (checked) {
      const newSet = new Set(filteredExpenses.map(expense => expense.id));
      setSubmittedExpenses(newSet);
    } else {
      setSubmittedExpenses(new Set());
    }
  };

  // Add function to download all active receipts
  const downloadAllReceipts = async () => {
    const activeExpenses = expenses.filter(expense => expense.receipt_url);
    
    for (const expense of activeExpenses) {
      try {
        const response = await fetch(expense.receipt_url);
        const blob = await response.blob();
        
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        
        // Extract filename from receipt_url
        const filename = expense.receipt_url.split('/').pop();
        link.download = filename;
        
        // Append to document, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        window.URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error(`Failed to download receipt for expense ${expense.id}:`, error);
      }
    }
  };

  // Add delete expense function
  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await fetch(`/api/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete expense');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to delete expense');
      }

      // Remove from state
      setExpenses(expenses.filter(expense => expense.id !== expenseId));
      
      // Remove from submitted expenses if present
      setSubmittedExpenses(prev => {
        const newSet = new Set(prev);
        newSet.delete(expenseId);
        return newSet;
      });
      
      setShowDeleteConfirm(false);
      setExpenseToDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete expense');
      // Keep the modal open if there's an error
      setTimeout(() => setError(null), 3000);
    }
  };

  const completeSubmittedExpenses = async () => {
    try {
      const submittedIds = Array.from(submittedExpenses);
      const submittedList = expenses.filter(exp => submittedIds.includes(exp.id));
      
      const report = {
        id: Date.now(),
        date: new Date().toISOString(),
        expenses: submittedList,
        total: submittedList.reduce((sum, exp) => sum + Math.abs(exp.amount), 0),
      };

      // Save the report to the database
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report)
      });

      if (!response.ok) {
        throw new Error('Failed to save report');
      }

      setCompletedReports(prev => [...prev, report]);
      
      // Clear submitted expenses
      setSubmittedExpenses(new Set());
      
      // Update expenses status in database
      await Promise.all(submittedIds.map(id => 
        fetch(`/api/expenses/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: true,
            completedDate: new Date().toISOString()
          })
        })
      ));

      await fetchExpenses();
    } catch (error) {
      console.error('Error completing expenses:', error);
      setError('Failed to complete expenses');
    }
  };

  const exportReportToCSV = (report) => {
    const headers = ['Date', 'Merchant', 'Description', 'Category', 'Amount', 'Receipt'];
    const rows = report.expenses.map(exp => [
      exp.transaction_date,
      exp.merchant,
      exp.description,
      exp.category,
      Math.abs(exp.amount).toFixed(2),
      exp.receipt_url || 'No receipt'
    ]);

    const csvContent = [
      `Expense Report - ${new Date(report.date).toLocaleDateString()}`,
      `Total: $${report.total.toFixed(2)}`,
      '',
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-report-${new Date(report.date).toLocaleDateString().replace(/\//g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleReceiptFound = useCallback(async (receipt) => {
    try {
      // Get the first expense without a receipt
      const expense = missingReceiptExpenses[0];
      if (!expense) return;

      // Update the expense with the new receipt
      const response = await fetch(`/api/expenses/${expense.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receipt_url: receipt.url,
          receipt_text: receipt.ocrText || receipt.content,
          receipt_source: receipt.source,
          receipt_date: receipt.date
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update expense');
      }

      const updatedExpense = await response.json();

      // Update the local state
      setUpdatedExpenses(prev => 
        prev.map(exp => 
          exp.id === updatedExpense.id ? updatedExpense : exp
        )
      );
    } catch (error) {
      console.error('Error updating expense with receipt:', error);
    }
  }, [missingReceiptExpenses]);

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

      // Update local state through parent
      const updatedExpenses = expenses.map(exp => 
        exp.id === expenseId 
          ? { ...exp, description: editValue }
          : exp
      );
      setExpenses(updatedExpenses);

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

  return (
    <div className="h-screen bg-[#121212] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className={`bg-black border-b md:border-r border-gray-800 transition-all duration-300 
        ${sidebarOpen ? 'md:w-64' : 'md:w-20'} ${sidebarOpen ? 'h-auto' : 'h-16'} md:h-screen`}>
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h1 className={`font-bold text-[#1DB954] transition-opacity duration-300
            ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 md:hidden'}`}>
            Expenses
          </h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-900 rounded-full transition-colors">
            <Menu className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        <nav className={`p-4 ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
          <ul className="space-y-2">
            {[
              { id: 'active', label: 'Active Expenses', icon: CreditCard },
              { id: 'missing', label: 'Missing Receipts', icon: Receipt, count: missingReceipts },
              { id: 'submitted', label: 'Submitted', icon: CheckCircle, count: submittedExpenses.size },
              { id: 'completed', label: 'Completed Reports', icon: Archive, count: completedReports.length }
            ].map(({ id, label, icon: Icon, count }) => (
              <li key={id}>
                <button
                  onClick={() => {
                    setCurrentView(id);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all
                    ${currentView === id 
                      ? 'bg-[#1DB954] text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left">{label}</span>
                      {count > 0 && (
                        <span className="bg-gray-800 text-gray-300 px-2 py-0.5 
                          rounded-full text-xs">
                          {count}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Total Section */}
          {sidebarOpen && (
            <div className="mt-8 p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="text-sm text-gray-400 mb-1">
                {currentView === 'submitted' ? 'Total Submitted' : 
                 currentView === 'active' ? 'Total Active' : currentView === 'missing' ? 'Total Missing' : 'Total Completed'}
              </div>
              <div className="text-2xl font-bold text-white">
                ${Math.abs(currentView === 'submitted' ? 
                  filteredExpenses.filter(e => submittedExpenses.has(e.id))
                    .reduce((sum, expense) => sum + expense.amount, 0) :
                  filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
                ).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {currentView === 'submitted' ? 
                  `${submittedExpenses.size} submitted ${submittedExpenses.size === 1 ? 'expense' : 'expenses'}` :
                  `${filteredExpenses.length} ${filteredExpenses.length === 1 ? 'expense' : 'expenses'}`}
              </div>
            </div>
          )}

          {/* Add Upload Button */}
          <button
            onClick={() => setShowUploader(true)}
            className="w-full p-4 flex items-center space-x-2 hover:bg-gray-900 transition-colors"
          >
            <Upload size={20} className="text-[#1DB954]" />
            {sidebarOpen && <span>Import Expenses</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-4rem)] md:h-screen bg-gradient-to-b from-gray-900 to-[#121212]">
        {/* Header */}
        <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b border-border">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <div className="mr-4 hidden md:flex">
              <h2 className="text-lg font-semibold">
                {currentView === 'active' && 'Active Expenses'}
                {currentView === 'missing' && 'Missing Receipts'}
                {currentView === 'submitted' && 'Submitted Expenses'}
                {currentView === 'completed' && 'Completed Reports'}
              </h2>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                <MobileSearch onSearch={setSearchQuery} />
              </div>
              <MobileFilters 
                activeFilters={activeFilters}
                onFilterChange={(key, value) => setActiveFilters(prev => ({ ...prev, [key]: value }))}
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        {!error && !isLoading && (
          <div className="flex-1 overflow-auto">
            {currentView === 'completed' ? (
              // Completed Reports View
              <div className="space-y-4 p-4">
                {completedReports.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    No completed reports yet
                  </div>
                ) : (
                  completedReports.map(report => (
                    <div key={report.id} className="bg-gray-900 rounded-xl border border-gray-800">
                      {/* Report Header */}
                      <div
                        onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                        className="p-4 cursor-pointer hover:bg-gray-800 transition-colors flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Report - {new Date(report.date).toLocaleDateString()}
                          </h3>
                          <p className="text-gray-400">
                            {report.expenses.length} expenses - Total: ${report.total.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              exportReportToCSV(report);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] rounded-full hover:bg-[#1ed760] transition-colors"
                          >
                            <Download size={18} />
                            <span>Export CSV</span>
                          </button>
                          <div className={`transform transition-transform ${expandedReport === report.id ? 'rotate-180' : ''}`}>
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* Report Details */}
                      {expandedReport === report.id && (
                        <div className="border-t border-gray-800">
                          <div className="p-4 grid gap-3">
                            {report.expenses.map((expense, index) => (
                              <div
                                key={expense.id}
                                className={`${
                                  index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
                                } p-4 rounded-lg grid grid-cols-1 md:grid-cols-6 gap-4 items-center`}
                              >
                                <div className="text-gray-300">
                                  {new Date(expense.transaction_date).toLocaleDateString()}
                                </div>
                                <div className="font-medium text-white">
                                  {expense.merchant}
                                </div>
                                <div className="text-gray-300 md:col-span-2">
                                  {expense.description || 'No description'}
                                </div>
                                <div className="text-gray-300">
                                  <span className="px-2 py-1 bg-gray-900 rounded-full text-sm">
                                    {expense.category}
                                  </span>
                                </div>
                                <div className={`font-medium ${
                                  expense.amount < 0 ? 'text-red-400' : 'text-green-400'
                                }`}>
                                  ${Math.abs(expense.amount).toFixed(2)}
                                </div>
                                {expense.receipt_url && (
                                  <div className="md:col-span-6 flex items-center gap-2 pt-2 border-t border-gray-700">
                                    <div className="flex items-center gap-2">
                                      <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
                                      <span className="text-sm text-gray-400">Receipt attached</span>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setSelectedExpense(expense);
                                        setShowReceiptModal(true);
                                      }}
                                      className="text-[#1DB954] hover:text-[#1ed760] text-sm"
                                    >
                                      View Receipt
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : currentView === 'missing' ? (
              <div className="p-4 flex flex-col h-full">
                {/* Receipt Finder at the top */}
                <div className="flex-none">
                  <ReceiptFinder
                    onReceiptFound={handleReceiptFound}
                    missingReceiptExpenses={missingReceiptExpenses}
                  />
                </div>
                
                {/* Missing Receipts List at the bottom */}
                <div className="flex-1 mt-6 overflow-auto">
                  <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-900 rounded-xl border border-gray-800">
                      <div className="p-4 border-b border-gray-800">
                        <h3 className="text-lg font-semibold text-white">Missing Receipts</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {missingReceiptExpenses.length} expenses need receipts
                        </p>
                      </div>
                      <div className="divide-y divide-gray-800">
                        {missingReceiptExpenses.map((expense, index) => (
                          <div
                            key={expense.id}
                            className={`p-4 ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} 
                              hover:bg-gray-700 transition-colors`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                  <div className="font-medium text-white truncate">
                                    {expense.merchant}
                                  </div>
                                  <span className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full text-xs">
                                    {expense.category || 'Uncategorized'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 mt-1">
                                  <div className="text-sm text-gray-400">
                                    {new Date(expense.transaction_date).toLocaleDateString()}
                                  </div>
                                  <span className={`text-sm font-medium ${
                                    expense.amount < 0 ? 'text-red-400' : 'text-green-400'
                                  }`}>
                                    ${Math.abs(expense.amount).toFixed(2)}
                                  </span>
                                </div>
                                {expense.description && (
                                  <div className="text-sm text-gray-500 mt-1 truncate">
                                    {expense.description}
                                  </div>
                                )}
                                {expense.category_details && (
                                  <div className="text-xs text-gray-600 mt-1">
                                    {expense.category_details}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedExpense(expense);
                                    setShowReceiptModal(true);
                                  }}
                                  className="px-4 py-2 bg-[#1DB954] text-white rounded-lg 
                                    hover:bg-[#1ed760] transition-colors text-sm font-medium 
                                    whitespace-nowrap flex items-center gap-2"
                                >
                                  <FileText className="w-4 h-4" />
                                  Upload Receipt
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Regular Expense List View
              <div className="p-4">
                <div className="max-w-7xl mx-auto">
                  {/* Mobile List View */}
                  <div className="md:hidden space-y-3">
                    {sortedExpenses.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">
                        No expenses found
                      </div>
                    ) : (
                      sortedExpenses.map((expense, index) => (
                        <div key={expense.id} 
                          className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} 
                            rounded-xl p-4 space-y-3 hover:bg-gray-700 
                            transition-all border border-gray-800 hover:border-gray-700`}>
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={submittedExpenses.has(expense.id)}
                                  onChange={() => toggleSubmission(expense.id)}
                                  className="w-4 h-4 rounded border-gray-600 text-[#1DB954] 
                                    focus:ring-[#1DB954] focus:ring-offset-gray-900"
                                />
                                {currentView === 'submitted' && (
                                  <button
                                    onClick={() => toggleSubmission(expense.id)}
                                    className="text-xs text-gray-400 hover:text-white transition-colors"
                                  >
                                    Unsubmit
                                  </button>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-white text-lg truncate">
                                  {expense.merchant}
                                </div>
                                <div className="text-sm text-gray-400 flex items-center gap-2 flex-wrap">
                                  <span>{new Date(expense.transaction_date).toLocaleDateString()}</span>
                                  <span className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full text-xs">
                                    {expense.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className={`text-lg font-semibold whitespace-nowrap ${expense.amount < 0 
                              ? 'text-red-400' 
                              : 'text-green-400'}`}>
                              ${Math.abs(expense.amount).toFixed(2)}
                            </span>
                          </div>
                          <div className="relative">
                            {editingExpense === expense.id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleSaveDescription(expense.id);
                                    } else if (e.key === 'Escape') {
                                      handleCancelEdit();
                                    }
                                  }}
                                  className="flex-1 bg-gray-800 text-white px-3 py-1.5 rounded-lg 
                                    border border-gray-700 focus:border-[#1DB954] focus:ring-1 
                                    focus:ring-[#1DB954] outline-none"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSaveDescription(expense.id)}
                                  className="px-3 py-1.5 bg-[#1DB954] text-white rounded-lg 
                                    hover:bg-[#1ed760] transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg 
                                    hover:bg-gray-700 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div 
                                onClick={() => handleStartEdit(expense)}
                                className="text-gray-300 min-h-[1.5rem] cursor-pointer 
                                  hover:bg-gray-800 rounded px-2 py-1 -mx-2 transition-colors"
                              >
                                {expense.description || 'Add description...'}
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${expense.receipt_url 
                                ? 'bg-[#1DB954]' 
                                : 'bg-gray-600'}`} />
                              <span className="text-sm text-gray-400">
                                {expense.receipt_url ? 'Receipt attached' : 'No receipt'}
                              </span>
                            </div>
                            <ReceiptCell
                              receipt_url={expense.receipt_url}
                              onViewReceipt={() => {
                                setSelectedExpense(expense);
                                setShowReceiptModal(true);
                              }}
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => {
                                setExpenseToDelete(expense.id);
                                setShowDeleteConfirm(true);
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    {/* Table Header */}
                    <div className="grid grid-cols-8 gap-4 px-6 py-4 bg-gray-900 rounded-t-xl
                      text-sm font-medium text-gray-400 border-b border-gray-800">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filteredExpenses.length > 0 && 
                            filteredExpenses.every(expense => submittedExpenses.has(expense.id))}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-600 text-[#1DB954] 
                            focus:ring-[#1DB954] focus:ring-offset-gray-900"
                        />
                        <span className="ml-2">Submitted</span>
                      </div>
                      {[
                        { key: 'transaction_date', label: 'Date' },
                        { key: 'merchant', label: 'Merchant' },
                        { key: 'description', label: 'Description', colSpan: 2 },
                        { key: 'category', label: 'Category' },
                        { key: 'amount', label: 'Amount' },
                        { key: 'receipt', label: 'Receipt', hasReceipt: true }
                      ].map(({ key, label, colSpan, hasReceipt }) => (
                        <div key={key} className={colSpan ? `col-span-${colSpan}` : ''}>
                          {!hasReceipt ? (
                            <button 
                              onClick={() => setSortConfig({ 
                                key,
                                direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                              })}
                              className="hover:text-white flex items-center gap-2 transition-colors"
                            >
                              {label}
                              {sortConfig.key === key && (
                                <span className="text-[#1DB954]">
                                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </button>
                          ) : (
                            <div className="flex items-center justify-between">
                              <span>{label}</span>
                              <span className="text-xs text-gray-500">
                                {expenses.filter(e => e.receipt_url).length}/{expenses.length}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-800">
                      {sortedExpenses.length === 0 ? (
                        <div className="px-6 py-8 text-center text-gray-400 bg-gray-900 rounded-b-xl">
                          No expenses found
                        </div>
                      ) : (
                        <div className="bg-gray-900 rounded-b-xl">
                          {sortedExpenses.map((expense, index) => (
                            <div key={expense.id} 
                              className={`grid grid-cols-8 gap-4 px-6 py-4 
                                ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} 
                                hover:bg-gray-700 transition-colors group`}>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={submittedExpenses.has(expense.id)}
                                  onChange={() => toggleSubmission(expense.id)}
                                  className="w-4 h-4 rounded border-gray-600 text-[#1DB954] 
                                    focus:ring-[#1DB954] focus:ring-offset-gray-900"
                                />
                              </div>
                              <div className="text-gray-400 whitespace-nowrap">
                                {new Date(expense.transaction_date).toLocaleDateString()}
                              </div>
                              <div className="font-medium text-white truncate">
                                {expense.merchant}
                              </div>
                              <div className="col-span-2 relative">
                                {editingExpense === expense.id ? (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={editValue}
                                      onChange={(e) => setEditValue(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleSaveDescription(expense.id);
                                        } else if (e.key === 'Escape') {
                                          handleCancelEdit();
                                        }
                                      }}
                                      className="flex-1 bg-gray-800 text-white px-3 py-1.5 rounded-lg 
                                        border border-gray-700 focus:border-[#1DB954] focus:ring-1 
                                        focus:ring-[#1DB954] outline-none"
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => handleSaveDescription(expense.id)}
                                      className="px-3 py-1.5 bg-[#1DB954] text-white rounded-lg 
                                        hover:bg-[#1ed760] transition-colors"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={handleCancelEdit}
                                      className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg 
                                        hover:bg-gray-700 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <div 
                                    onClick={() => handleStartEdit(expense)}
                                    className="text-gray-300 min-h-[1.5rem] cursor-pointer 
                                      hover:bg-gray-800 rounded px-2 py-1 -mx-2 transition-colors"
                                  >
                                    {expense.description || 'Add description...'}
                                  </div>
                                )}
                                {expense.memo && (
                                  <div className="text-sm text-gray-500 mt-1 truncate">
                                    {expense.memo}
                                  </div>
                                )}
                              </div>
                              <div className="text-gray-400 whitespace-nowrap">
                                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                                  {expense.category}
                                </span>
                              </div>
                              <div className="whitespace-nowrap">
                                <span className={`font-medium ${expense.amount < 0 
                                  ? 'text-red-400' 
                                  : 'text-green-400'}`}>
                                  ${Math.abs(expense.amount).toFixed(2)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className={`w-2 h-2 rounded-full ${expense.receipt_url 
                                  ? 'bg-[#1DB954]' 
                                  : 'bg-gray-600'}`} />
                                <ReceiptCell
                                  receipt_url={expense.receipt_url}
                                  onViewReceipt={() => {
                                    setSelectedExpense(expense);
                                    setShowReceiptModal(true);
                                  }}
                                />
                              </div>
                              <div className="flex justify-end">
                                <button
                                  onClick={() => {
                                    setExpenseToDelete(expense.id);
                                    setShowDeleteConfirm(true);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 text-gray-400 
                                    hover:text-red-500 transition-all ml-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Error</h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#1DB954] text-white rounded-full 
                  hover:bg-[#1ed760] transition-colors flex items-center 
                  space-x-2 mx-auto"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Retry</span>
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 
              border-[#1DB954] border-t-transparent" />
          </div>
        )}

        {/* Receipt Modal */}
        {showReceiptModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex 
            items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-xl w-full max-w-lg max-h-[90vh] 
              overflow-auto border border-gray-800">
              <div className="p-4 border-b border-gray-800 flex items-center 
                justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {selectedExpense?.receipt_url ? 'View Receipt' : 'Upload Receipt'}
                </h3>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>
              <div className="p-4">
                <ReceiptModalContent
                  selectedExpense={selectedExpense}
                  onDrop={handleReceiptDrop}
                />
              </div>
            </div>
          </div>
        )}

        {/* CSV Uploader Modal */}
        {showUploader && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#282828] rounded-lg shadow-xl max-w-2xl w-full mx-4">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Import Expenses</h2>
                <button
                  onClick={() => setShowUploader(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <CSVUploader
                  onUploadComplete={() => {
                    setShowUploader(false);
                    fetchExpenses();
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex 
            items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-xl w-full max-w-md p-6 
              border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4">Delete Expense</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete this expense? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setExpenseToDelete(null);
                  }}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg 
                    hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteExpense(expenseToDelete)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg 
                    hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Complete Expenses Modal */}
        {showCompleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">Complete Expenses</h2>
              <p className="mb-4">
                Are you sure you want to complete these expenses? This will:
                <ul className="list-disc list-inside mt-2">
                  <li>Move {submittedExpenses.size} expenses to completed status</li>
                  <li>Create a dated report with the total amount</li>
                  <li>Allow you to export the report as CSV</li>
                </ul>
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowCompleteModal(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    completeSubmittedExpenses();
                    setShowCompleteModal(false);
                  }}
                  className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker; 