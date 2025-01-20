'use client';

import React from 'react';
import { X, Calendar, Building, Tag, DollarSign, FileText, CheckCircle } from 'lucide-react';

export default function ReceiptViewer({ expense, onClose }) {
  const isPDF = expense.receipt_url?.toLowerCase().endsWith('.pdf');

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-3xl overflow-hidden border border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Receipt Viewer</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          {expense.receipt_url ? (
            isPDF ? (
              <iframe
                src={`${expense.receipt_url}#toolbar=0`}
                className="w-full h-[600px] rounded border border-border"
                title="Receipt PDF"
              />
            ) : (
              <img
                src={expense.receipt_url}
                alt="Receipt"
                className="w-full h-auto rounded"
              />
            )}
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No receipt available
            </div>
          )}
        </div>

        <div className="p-4 bg-muted/50 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium">{expense.transaction_date}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Amount</p>
              <p className="font-medium">${Math.abs(expense.amount).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Category</p>
              <p className="font-medium">{expense.category || '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Description</p>
              <p className="font-medium">{expense.description || '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 