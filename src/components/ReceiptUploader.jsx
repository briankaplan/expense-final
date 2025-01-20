'use client';

import { useState, useRef } from 'react';
import { X, Upload, Image, FileText } from 'lucide-react';

export default function ReceiptUploader({ expense, onClose, onUploadComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    // Check file type
    if (!file.type.match('image/*') && !file.type.match('application/pdf')) {
      setError('Please upload an image or PDF file');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('expenseId', expense.id);

      const response = await fetch('/api/upload-receipt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload receipt');
      }

      const data = await response.json();
      onUploadComplete(data.receipt_url);
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload receipt. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md overflow-hidden border border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Upload Receipt</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Drop your receipt here or click to upload</p>
                <p className="text-sm text-muted-foreground">
                  Supports images and PDFs up to 10MB
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Image className="w-4 h-4" />
                  <span>Images</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>PDF</span>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,application/pdf"
                onChange={handleFileSelect}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Select File'}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-sm">
              {error}
            </div>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            <p className="font-medium mb-2">Receipt for:</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium">{expense.transaction_date}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Amount</p>
                <p className="font-medium">${Math.abs(expense.amount).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 