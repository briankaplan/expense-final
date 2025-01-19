import React from 'react';
import { FileText, Download } from 'lucide-react';

const ReceiptModalContent = ({ selectedExpense, onDrop }) => {
  const isPDF = selectedExpense?.receipt_url?.toLowerCase().endsWith('.pdf');

  const handleDownload = async () => {
    try {
      const response = await fetch(selectedExpense.receipt_url);
      const blob = await response.blob();
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      
      // Extract filename from receipt_url
      const filename = selectedExpense.receipt_url.split('/').pop();
      link.download = filename;
      
      // Append to document, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Failed to download receipt:', error);
    }
  };

  if (!selectedExpense?.receipt_url) {
    return (
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const files = Array.from(e.dataTransfer.files);
          onDrop(files);
        }}
        className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center"
      >
        <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400 mb-2">Drag and drop a receipt here</p>
        <p className="text-sm text-gray-500">Supported formats: PDF, PNG, JPG</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {isPDF ? 'PDF Document' : 'Image'}
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-full 
            hover:bg-[#1ed760] transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          <span>Download Receipt</span>
        </button>
      </div>
      
      {isPDF ? (
        <iframe
          src={selectedExpense.receipt_url}
          className="w-full h-[60vh] rounded-lg border border-gray-800"
          title="Receipt PDF"
        />
      ) : (
        <img
          src={selectedExpense.receipt_url}
          alt="Receipt"
          className="w-full h-auto rounded-lg border border-gray-800"
        />
      )}
    </div>
  );
};

export default ReceiptModalContent; 