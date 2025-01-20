'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Receipt, FileText, Upload, Download, CheckCircle, AlertCircle, AlertTriangle, Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import { UploadModal } from './UploadModal';
import { useTheme } from 'next-themes';

const tabs = [
  { 
    id: 'all',
    label: 'All Expenses',
    icon: Receipt,
    count: null 
  },
  { 
    id: 'active',
    label: 'Active Receipts',
    icon: FileText,
    count: null,
    badge: 'text-green-400'
  },
  { 
    id: 'missing',
    label: 'Missing Receipts',
    icon: AlertTriangle,
    count: null,
    badge: 'text-red-400'
  },
  { 
    id: 'submitted',
    label: 'Submitted',
    icon: CheckCircle,
    count: null,
    badge: 'text-blue-400'
  }
];

export function Sidebar({ expenses = [], activeTab, onTabChange, className }) {
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate totals
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const activeReceipts = expenses.filter(exp => exp.receipt_url && !exp.submitted).length;
  const missingReceipts = expenses.filter(exp => !exp.receipt_url).length;
  const submittedReceipts = expenses.filter(exp => exp.submitted).length;

  // Update tab counts
  tabs[0].count = expenses.length;
  tabs[1].count = activeReceipts;
  tabs[2].count = missingReceipts;
  tabs[3].count = submittedReceipts;

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadStatus({ type: 'loading', message: 'Uploading expenses...' });
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload expenses');
      }

      const result = await response.json();
      
      setUploadStatus({ 
        type: 'success', 
        message: `Successfully imported ${result.successCount} expenses` 
      });

      // Refresh the page after 2 seconds to show new expenses
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({ 
        type: 'error', 
        message: error.message || 'Failed to upload expenses' 
      });
    }

    // Clear the file input
    event.target.value = '';
  };

  // Render theme toggle button only after mounting to prevent hydration mismatch
  const renderThemeToggle = () => {
    if (!mounted) return null;

    return (
      <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        {theme === 'dark' ? (
          <>
            <Sun className="w-5 h-5 shrink-0" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-5 h-5 shrink-0" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  };

  return (
    <div className={cn("flex flex-col h-full bg-card", className)}>
      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}

      {/* Logo */}
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <Receipt className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-semibold">Expenses</h1>
      </div>

      {/* Total Amount Card */}
      <div className="px-3 py-4">
        <div className="p-4 rounded-lg bg-secondary">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold text-primary">
            ${Math.abs(totalAmount).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "sidebar-item",
              activeTab === tab.id 
                ? "sidebar-item-active" 
                : "sidebar-item-inactive"
            )}
          >
            <tab.icon className="w-5 h-5 shrink-0" />
            <span className="flex-1 text-left">{tab.label}</span>
            {tab.count !== null && (
              <span className={cn(
                "text-sm font-medium",
                tab.badge || "text-muted-foreground"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Actions */}
      <div className="p-3 space-y-2">
        <button 
          className="sidebar-item sidebar-item-inactive"
          onClick={() => setShowUploadModal(true)}
        >
          <Upload className="w-5 h-5 shrink-0" />
          <span>Upload CSV</span>
        </button>
        <button 
          className="sidebar-item sidebar-item-inactive"
          onClick={() => {/* Handle export */}}
        >
          <Download className="w-5 h-5 shrink-0" />
          <span>Export Receipts</span>
        </button>
      </div>

      {/* Theme Toggle */}
      <div className="p-3 border-t border-border">
        {renderThemeToggle()}
      </div>

      {/* User Section */}
      <div className="p-3 border-t border-border">
        <button className="sidebar-item sidebar-item-inactive">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            BK
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium">Brian Kaplan</div>
            <div className="text-sm text-muted-foreground">View Profile</div>
          </div>
        </button>
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <div className={cn(
          "mt-4 p-4 rounded-lg",
          uploadStatus.type === 'loading' && "bg-muted text-muted-foreground",
          uploadStatus.type === 'success' && "status-badge-success",
          uploadStatus.type === 'error' && "status-badge-error"
        )}>
          <p className="text-sm">{uploadStatus.message}</p>
        </div>
      )}
    </div>
  );
} 