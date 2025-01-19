'use client';

import React from 'react';
import { X, Calendar, Building, Tag, DollarSign, FileText, CheckCircle } from 'lucide-react';

export function ReceiptViewer({ expense, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#282828] rounded-xl shadow-xl w-full max-w-7xl max-h-[90vh] flex">
        {/* Left Panel - Receipt Image */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Receipt Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Receipt Image */}
          <div className="flex-1 p-4 overflow-auto">
            {expense.receipt_url ? (
              <img
                src={expense.receipt_url}
                alt="Receipt"
                className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white/40">
                No receipt available
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Receipt Details */}
        <div className="w-96 flex flex-col bg-[#121212]">
          <div className="p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/60">Transaction Details</h3>
              <div className="space-y-4 mt-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Date</p>
                    <p className="text-sm text-white/60">
                      {new Date(expense.transaction_date).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Merchant</p>
                    <p className="text-sm text-white/60">{expense.merchant || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Category</p>
                    <p className="text-sm text-white/60">{expense.category || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Amount</p>
                    <p className="text-sm text-white/60">${Math.abs(expense.amount).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Description</p>
                    <p className="text-sm text-white/60">{expense.description || '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            {expense.receipt_url && (
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#1DB954]" />
                  <span className="text-[#1DB954] font-medium">Receipt verified</span>
                </div>
                <p className="mt-1 text-xs text-white/40">
                  This receipt has been processed and verified by our system.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 